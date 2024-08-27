import { MailtrapClient } from 'mailtrap';
import { ENV_VARS } from './env.config.js';

// The configuration object for the MailtrapClient.
const config = {
  token: ENV_VARS.MAILTRAP_TOKEN, // The API token for authentication.
  endpoint: ENV_VARS.MAILTRAP_ENDPOINT, // The endpoint URL of the Mailtrap API.
};

/**
 * Creates a new instance of MailtrapClient with the provided configuration.
 * return A new instance of MailtrapClient.
 */
export const mailtrapClient = new MailtrapClient(config);

/**
 * Defines the sender's email and name for the application.
 *
 * @constant {Object} SENDER
 * @property {string} email - The email address of the sender.
 * @property {string} name - The name of the sender.
 *
 * @example
 * import { SENDER } from './mailtrap.config.js';
 *
 * console.log(SENDER.email); // 'netflixclone@demomailtrap.com'
 * console.log(SENDER.name); // 'Netflix Clone'
 */
export const SENDER = {
  email: 'netflixclone@demomailtrap.com',
  name: 'Netflix Clone',
};

/**
 * Defines the unique identifiers for the email templates used in the application.
 *
 * @constant {Object} EMAIL_TEMPLATE_IDS
 * @property {string} verification_email - The UUID of the verification email template.
 * @property {string} welcome_email - The UUID of the welcome email template.
 * @property {string} reset_password_email - The UUID of the reset password email template.
 *
 * @example
 * import { EMAIL_TEMPLATE_IDS } from './mailtrap.config.js';
 *
 * console.log(EMAIL_TEMPLATE_IDS.verification_email); // '8168646a-586c-4e1e-a0c9-087bb1b46665'
 * console.log(EMAIL_TEMPLATE_IDS.welcome_email); // '00eecab8-06f1-42fa-a67c-45e7bd7a3d42'
 * console.log(EMAIL_TEMPLATE_IDS.reset_password_email); // '005b8a30-c0ad-4d15-9440-bccbc01c9ecd'
 */
export const EMAIL_TEMPLATE_IDS = {
  verification_email: '8168646a-586c-4e1e-a0c9-087bb1b46665',
  welcome_email: '00eecab8-06f1-42fa-a67c-45e7bd7a3d42',
  reset_password_email: '005b8a30-c0ad-4d15-9440-bccbc01c9ecd',
  reset_password_confirmation_email: '3b1e23ae-e0a6-44ff-ac63-3970bca6e2e7',
};

/**
 * Defines the template variables for the email templates used in the application.
 *
 * @constant {Object} EMAIL_TEMPLATE_VARIABLES
 * @property {string} name - The name of the recipient.
 * @property {string} phone - The phone number of the recipient.
 * @property {string} company_info_name - The name of the company.
 * @property {string} company_info_address - The address of the company.
 * @property {string} company_info_city - The city of the company.
 * @property {string} company_info_zip_code - The zip code of the company.
 * @property {string} company_info_country - The country of the company.
 *
 */
export const EMAIL_TEMPLATE_VARIABLES = {
  name: 'Test_Name',
  phone: '000000',
  company_info_name: 'NETFLIX CLONE',
  company_info_address: 'Laxmi Nagar',
  company_info_city: 'New Delhi',
  company_info_zip_code: '110091',
  company_info_country: 'India',
};
