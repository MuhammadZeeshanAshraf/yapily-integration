import { Request } from 'express';

export const IYapilyService = Symbol('IYapilyService');

export interface IYapilyService {
  getInstitutions(): Promise<any>;
  addUser(email: string): Promise<any>;
  consentAuthRequest(
    applicationUserId: string,
    institutionId: string,
  ): Promise<any>;
  authCallBack(authState: string, authCode: string): Promise<any>;
  authTestCallBack(
    consent: string,
    userUUID: string,
    institutionId: string,
  ): Promise<any>;
  getUserAccounts(consent: string);
  getAccounts(institutionId: string);
  reAuthorize(institutionId: string);
  authRequest(institutionId: string): Promise<any>;
  getTransactions(accountId: string);
}
