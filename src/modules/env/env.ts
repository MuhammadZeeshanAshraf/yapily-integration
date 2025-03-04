import { ENVIRONMENTS } from 'src/common/constants/enums';
import { SYSTEM_ERROR_MESSAGES } from 'src/common/constants/errors';
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(ENVIRONMENTS, {
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('NODE_ENV'),
  }),
  PORT: z.coerce.number({
    required_error: SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_NUMBER('PORT'),
  }),
  DB_USERNAME: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('DB_USERNAME'),
  }),
  DB_PASSWORD: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('DB_PASSWORD'),
  }),
  DB_HOST: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('DB_USERNAME'),
  }),
  DB_PORT: z.coerce.number({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_NUMBER('DB_PORT'),
  }),
  DB_SCHEMA: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('DB_SCHEMA'),
  }),
  DB_NAME: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('DB_NAME'),
  }),
  TEST_EMAIL: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('TEST_EMAIL'),
  }),
  YAPILY_CLIENT_ID: z.string({
    required_error:
      SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING('YAPILY_CLIENT_ID'),
  }),
  YAPILY_CLIENT_SECRET: z.string({
    required_error: SYSTEM_ERROR_MESSAGES.REQUIRED_AND_MUST_BE_A_STRING(
      'YAPILY_CLIENT_SECRET',
    ),
  }),
});
export type Env = z.infer<typeof envSchema>;
