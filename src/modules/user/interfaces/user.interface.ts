import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export const IUserService = Symbol('IUserService');

export interface IUserService {
  updateOne(email: string, updateDto: UpdateUserDto): Promise<string>;
  findOne(email: string): Promise<User>;
  findOneByUUID(uuid: string): Promise<User>;
}
