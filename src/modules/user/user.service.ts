import { Inject, Injectable } from '@nestjs/common';

import { IUserService } from './interfaces/user.interface';

import { IUserRepository } from './repositories/interfaces/user-repository.interface';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RESPONSE_MESSAGES } from 'src/common/constants';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
  async updateOne(email: string, updateDto: UpdateUserDto) {
    await this.userRepository.update({ email }, updateDto);
    return RESPONSE_MESSAGES.UPDATED;
  }

  findOneByUUID(uuid: string): Promise<User> {
    return this.userRepository.findOne({ yapilyUUID: uuid });
  }
}
