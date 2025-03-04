export const SYSTEM_ERROR_MESSAGES = {
  NODE_ENV:
    "NODE_ENV is required and must be one of 'dev', 'qa', 'uat', 'prod'.",
  REQUIRED_AND_MUST_BE_A_NUMBER: (envVar: string) =>
    `${envVar} is required and must be a number.`,
  REQUIRED_AND_MUST_BE_A_STRING: (envVar: string) =>
    `${envVar} is required and must be a string.`,
};

export const APP_ERROR_MESSAGES = {
  ALREADY_EXISTS: (entity: string, property?: string) =>
    `${entity} ${property ? `with ${property} ` : ''}already exists.`,
  ALREADY_EXISTS_WITH_DELETED: (entity: string) =>
    `${entity} already exists but has been marked as deleted.`,
  NOT_FOUND: (entity: string) => `${entity} was not found.`,
  ALREADY_DELETED: (entity: string) => `${entity} has already been deleted.`,
  ALREADY_IN_ACTIVE: (entity: string) => `${entity} is already inactive.`,
  ALREADY_ACTIVE: (entity: string) => `${entity} is already active.`,
  INVALID_PASSWORD:
    'The password you entered is incorrect. Please try again or reset your password if needed.',
  INVALID_TOKEN:
    'The token is not valid. Please try again with verified token.',
  ALREADY_VERIFIED:
    'Your account has already been verified. You can proceed with logging in.',
  ALREADY_USED:
    'This token has already been used. Please request a new one if needed.',
  EXPIRED_TOKEN:
    'This token has expired. Please request a new verification or reset token.',
  NOT_VERIFIED:
    'Your account is not verified. Please check your email for the verification link or request a new one.',
  FAILED_OPERATION: (operation: string) =>
    `Unable to ${operation}. Please try again.`,
  INTERNAL_SERVER_ERROR:
    'An unexpected error occurred. Please try again later.',
  MAX_FILE_SIZE: (size: string) =>
    `The uploaded file exceeds the maximum size limit of ${size}.`,
  INVALID_ROLE: 'The selected role is invalid.',
  INVALID_CREDENTIALS_FOR_PARTNER_PORTAL:
    'Invalid login credentials for the partner portal.',
  INVALID_USER_ROLE: 'The specified user role is not valid.',
  MAX_FILE_SIZE_5MB: 'The file size exceeds the maximum limit of 5MB.',
  UNABLE_TO_READ_FILE: 'The uploaded file could not be read.',
  VERIFY_EMAIL: 'Please verify your email to continue.',
  FILE_UPLOADED_CORRUPT:
    'The uploaded file appears to be corrupted or invalid.',
  FORM_NOT_FOUND:
    'No form is available for the selected nationality. Please contact support.',
  DOCUMENT_LIBRARY_NOT_ADDED:
    'Required documents are missing from the document library. Please add them.',
  DEACTIVATED_USER:
    'Your account has been deactivated. Please contact Propellus support for assistance.',
  PLEASE_SELECT_COUNTRY: 'Please select a residency or destination country.',
  USER_ALREADY_EXISTS:
    'An account with this email already exists. Please log in or use a different email.',
  UNAUTHORIZED: `You are not authorized to access this information.`,
  REQUIRED: (entity: string) =>
    `${entity} is required to complete this action.`,
};
