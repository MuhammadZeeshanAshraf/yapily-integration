import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { DatabaseModule } from './common/database';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { envSchema } from './modules/env/env';
import { EnvModule } from './modules/env/env.module';
import { UserModule } from './modules/user/user.module';
import { SeederModule } from './common/database/seeders/seeder.module';
import { YapilyModule } from './modules/yapily/yapily.module';
import { AppService } from './app.service';
import { AccountModule } from './modules/accounts/account.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { ConsentModule } from './modules/consents/consent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseModule,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),

    /* Add Module in Alphabetical Order */
    EnvModule,
    SeederModule,
    UserModule,
    YapilyModule,
    AccountModule,
    TransactionModule,
    ConsentModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext.apply(LoggerMiddleware).forRoutes('*');
  }
}
