import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DOMAIN_ENTITY } from 'src/common/constants';
import { IUserService } from './interfaces/user.interface';

@ApiTags(DOMAIN_ENTITY.USER)
@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}
}
