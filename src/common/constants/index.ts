/** */
export const PROJECT_NAME = 'YAPILY BACKEND 🚀';
export const PAGE_SIZE = Number.MAX_SAFE_INTEGER;
export const DEFAULT_PAGE = 1;
export const EMPTY_STRING = '';
export const ALL_STRING = 'All';
export const SWAGGER_PATH = '/api-docs';
export const RESPONSE_MESSAGES = {
  INTERNAL_SERVER_ERROR:
    "We're sorry, but our server encountered an unexpected error while processing your request. Please try again later, or contact our support team if the problem persists.",
  UPDATED: 'Successfully updated',
  DELETED: 'Successfully deleted',
  IN_ACTIVATED: 'Successfully inactivated',
  ACTIVATED: 'Successfully activated',
  DEACTIVATED: 'Successfully deactivated',
  VERIFY:
    'Your email has been successfully verified. You can now log in to your account',
  CREATED: 'Successfully created',
  VERIFICATION: 'Verification email sent successfully',
  SIGN_IN: 'Successfully signed in',
  RESET_PASSWORD_EMAIL: 'Reset password email sent successfully',
  RESET_PASSWORD: 'Password reset successfully',
  ALREADY_SENT_VERIFICATION:
    'Email has already been sent for verification. Please check your email',
  SYNCED: 'Successfully synced',
  NO_UPDATE_NEEDED: 'Not Updated',
  EMAIL_SENT: 'Email sent successfully',
  ADDED_TO_YAPILY: 'Account added to yapily.',
};

export const DUMMY_DATA = {
  email: 'user@gmail.com',
  password: 'i*RyNx7YCckM2*',
  name: 'Test-Partner-1',
  roleName: 'Dummy Role',
  token: 'eyJhbGci',
};

export const DOMAIN_ENTITY = {
  USER: 'User',
  YAPILY: 'Yapily',
  CONSENTS: 'Consents',
  ACCOUNTS: 'Accounts',
  TRANSACTIONS: 'Transactions',
};
