import { mailtrapClient, SENDER, EMAIL_TEMPLATE_IDS, EMAIL_TEMPLATE_VARIABLES } from '../config/mailtrap.config.js';
import { getCurrentDateTime } from '../helpers/helper.js';

/**
 * Sends a verification email with a verification code to the specified email address.
 * This function should call when a user signs up an account.
 *
 * @param {string} email - The email address to send the verification email to.
 * @param {string} verificationCode - The verification code to include in the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */
export const sendVerificationEmail = async (email, verificationCode) => {
  // Prepare the email content with the verification code
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.verification_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        phone: verificationCode,
        signup_timestamp: getCurrentDateTime(),
      },
    });
    // If no error occurred, log the successful email sending
    console.log('Verification email sent successfully', response);
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error('Error sending verification email', error);
    throw new Error(`Couldn't send verification email: ${error.message}`);
  }
};

/**
 * Sends a welcome email to the specified email address.
 * This function should call when a user successfully signs up an account.
 */
export const sendWelcomeEmail = async (email, name) => {
  // Prepare the email content with the user's name and email
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.welcome_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        name,
      },
    });
    // If no error occurred, log the successful email sending
    console.log('Welcome email sent successfully', response);
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error('Error sending welcome email', error);
    throw new Error(`Couldn't send welcome email: ${error.message}`);
  }
};

/**
 * Sends a password reset email to the specified email address.
 * This function should be called when a user requests a password reset.
 *
 * @param {string} email - The email address to send the password reset email to.
 * @param {string} url - The URL of the password reset page with a unique token.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */
export const sendPasswordResetEmail = async (email, url) => {
  // Prepare the email content with the email and password reset link
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.reset_password_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        company_info_website_url: url,
        email: email,
        signup_timestamp: getCurrentDateTime(),
      },
    });
    // If no error occurred, log the successful email sending
    console.log('Password reset email sent successfully', response);
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error('Error sending password reset email', error);
    throw new Error(`Couldn't send password reset email: ${error.message}`);
  }
};

/**
 * Sends a password reset success email to the specified email address.
 * This function should be called when a user successfully resets their password.
 *
 * @param {string} email - The email address to send the password reset success email to.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - Throws an error if the email sending fails.
 */
export const sendPasswordResetSuccessEmail = async (email) => {
  // Prepare the email content with the email
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: SENDER,
      to: recipients,
      template_uuid: EMAIL_TEMPLATE_IDS.reset_password_confirmation_email,
      template_variables: {
        ...EMAIL_TEMPLATE_VARIABLES,
        email: email,
        confirmation_timestamp: getCurrentDateTime(),
      },
    });
    // If no error occurred, log the successful email sending
    console.log('Password reset email sent successfully', response);
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error('Error sending password reset email', error);
    throw new Error(`Couldn't send password reset email: ${error.message}`);
  }
};
