import { Injectable, OnModuleInit } from '@nestjs/common';
import dataSource from '../dbConfig';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class TestUserSeed implements OnModuleInit {
  async onModuleInit() {
    await this.seed();
  }
  async seed() {
    const testEmail = process.env.TEST_EMAIL;

    await dataSource.initialize();
    const userRepository = await dataSource.getRepository('User');
    const user = await userRepository.findOne({ where: { email: testEmail } });
    if (!user) {
      await userRepository.save({ name: 'Test User', email: testEmail });
      console.log('Test user seeded successfully');
    } else {
      console.log('Test user already exists');
    }
  }
}
