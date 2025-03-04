import { Module } from '@nestjs/common';
import { TestUserSeed } from './test-user.seeder';

@Module({
  providers: [TestUserSeed],
})
export class SeederModule {}
