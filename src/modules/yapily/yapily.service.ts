import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { Axios } from 'axios';
import { IYapilyService } from './interface/yapily-service.interface';
import { Request } from 'express';
import { IUserService } from '../user/interfaces/user.interface';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { User } from '../user/entities/user.entity';
import { of } from 'rxjs';
import { IConsentService } from '../consents/interfaces/consent.interface';
import { Consent } from '../consents/entities/consent.entity';
import { CreateAccountDto } from '../accounts/dto/create-account.dto';
import { IAccountService } from '../accounts/interfaces/account.interface';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { ITransactionService } from '../transactions/interfaces/transaction.interface';
@Injectable()
export class YapilyService implements IYapilyService {
  client: Axios;
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
    @Inject(IConsentService)
    private readonly consentService: IConsentService,
    @Inject(ITransactionService)
    private readonly transactionService: ITransactionService,
    @Inject(IAccountService)
    private readonly accountService: IAccountService,
    private readonly configService: ConfigService,
  ) {
    this.client = axios.create({
      baseURL: this.configService.get('YAPILY_BASE_URL'),
      auth: {
        username: this.configService.get('YAPILY_CLIENT_ID'),
        password: this.configService.get('YAPILY_CLIENT_SECRET'),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getInstitutions() {
    try {
      const response = await this.client.get('/institutions');
      return response.data?.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to get institutions from Yapily',
      );
    }
  }
  async addUser(email: string) {
    try {
      const response = await this.client.post('users', {
        applicationUserId: email,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to add user to Yapily');
    }
  }
  async consentAuthRequest(applicationUserId: string, institutionId: string) {
    try {
      const response = await this.client.post('/account-auth-requests', {
        applicationUserId,
        institutionId,
        callback: this.configService.get('YAPILY_CALLBACK_URL'),
      });
      console.log(response.data, response.data?.data);
      return response.data?.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to get consent auth request from Yapily',
      );
    }
  }

  async addUserToYapily(user: User): Promise<string> {
    try {
      const data = await this.addUser(user.email);
      user.applicationUserId = user.email;
      user.yapilyUUID = data.uuid;
      await this.userService.updateOne(user.email, user);
      return RESPONSE_MESSAGES.ADDED_TO_YAPILY;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create yapily consent');
    }
  }

  async authRequest(institutionId: string): Promise<any> {
    const institutions = await this.getInstitutions();
    const institutionIds = institutions.map((institution) => institution.id);
    if (!institutionIds.includes(institutionId)) {
      throw new BadRequestException('Invalid institutionId');
    }

    const email = this.configService.get('TEST_EMAIL');
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.yapilyUUID) {
      await this.addUserToYapily(user);
    }

    const data = await this.consentAuthRequest(email, institutionId);
    return data;
  }

  async authCallBack(authState: string, authCode: string): Promise<any> {
    try {
      const response = await this.client.post('/consents/consent-auth-code', {
        authState,
        authCode,
      });
      console.log(response.data, response.data?.data);
      const { data } = response.data;
      if (data?.state === 'AUTHORIZED') {
        const user = await this.userService.findOneByUUID(data.userUuid);
        if (!user) {
          throw new Error('User not found');
        }
        const consent = new Consent();
        consent.userId = user.id;
        consent.institutionId = data.institutionId;
        consent.consentToken = data.consentToken;
        consent.consentId = data.id;
        const newConsent = await this.consentService.create(consent);
        const userAccounts = await this.getUserAccounts(data.consentToken);
        const accounts: CreateAccountDto[] = [];
        userAccounts.forEach((userAccount) => {
          accounts.push({
            accountId: userAccount.id,
            type: userAccount.type,
            institutionId: data.institutionId,
            consentId: newConsent.id,
            userId: user.id,
            balance: userAccount.balance,
          });
        });
        await this.accountService.createBulk(accounts);
      } else {
        console.error('Failed to authenticate user');
      }
      return { response: 'ok' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to authorize.');
    }
  }
  async authTestCallBack(
    consentToken: string,
    uuid: string,
    institutionId: string,
  ): Promise<any> {
    try {
      const user = await this.userService.findOneByUUID(uuid);
      if (!user) {
        throw new Error('User not found');
      }
      const consent = new Consent();
      consent.userId = user.id;
      consent.institutionId = institutionId;
      consent.consentToken = consentToken;
      const newConsent = await this.consentService.create(consent);
      const userAccounts = await this.getUserAccounts(consentToken);
      const accounts: CreateAccountDto[] = [];
      userAccounts.forEach((userAccount) => {
        accounts.push({
          accountId: userAccount.id,
          type: userAccount.type,
          institutionId: institutionId,
          consentId: newConsent.id,
          userId: user.id,
          balance: userAccount.balance,
        });
      });
      await this.accountService.createBulk(accounts);
      return { response: 'ok' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to authorize.');
    }
  }
  async getUserAccounts(consent: string) {
    try {
      const response = await this.client.get(`/accounts`, {
        headers: {
          consent,
        },
      });
      console.log(response.data, response.data?.data);
      return response.data?.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to get user accounts from Yapily',
      );
    }
  }

  async getAccounts(institutionId: string) {
    const email = this.configService.get('TEST_EMAIL');
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    const consent = await this.consentService.findOneByInstitutionId(
      institutionId,
      user.id,
    );
    if (!consent) {
      throw new Error('No consent found for this institution');
    }
    return this.getUserAccounts(consent.consentToken);
  }
  async reAuthorize(institutionId: string) {
    const email = this.configService.get('TEST_EMAIL');
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    const consent = await this.consentService.findOneByInstitutionId(
      institutionId,
      user.id,
    );
    if (!consent) {
      throw new Error('No consent found for this institution');
    }
    try {
      const response = await this.client.patch('/account-auth-requests', null, {
        headers: {
          consent: consent.consentToken,
        },
      });
      return response.data?.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to reauthorize.');
    }
  }

  async getTransactions(accountId: string) {
    const email = this.configService.get('TEST_EMAIL');
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }
    const account = await this.accountService.findOneByAccountId(accountId);
    const consent = await this.consentService.findOne(account.consentId);
    if (!consent) {
      throw new Error('No consent found for this institution');
    }
    try {
      const query = new URLSearchParams({
        limit: '10',
        sort: '-date',
      }).toString();
      const response = await this.client.get(
        `/accounts/${accountId}/transactions?${query}`,
        {
          headers: {
            consent: consent.consentToken,
          },
        },
      );
      const { data } = response.data

      if (data.length === 0) {
        throw new Error('No transactions found');
      }
      const transactions: CreateTransactionDto[] = data.map((transaction) => {
        return {
          transactionId: transaction.id,
          date: new Date(transaction.date),
          bookingDateTime: new Date(transaction.bookingDateTime),
          valueDateTime: new Date(transaction.valueDateTime),
          status: transaction.status,
          amount: transaction.amount,
          currency: transaction.currency,
          description: transaction.description,
          accountId: account.id,
          userId: user.id,
        };
      });
      await this.transactionService.createBulk(transactions, user.id);
      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to get transactions');
    }
  }
}
