import {
  mailtrapClient,
  SENDER,
  EMAIL_TEMPLATE_IDS,
  EMAIL_TEMPLATE_VARIABLES,
} from "../config/mailtrap.config.js";

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
      },
    });
    // If no error occurred, log the successful email sending
    console.log("Verification email sent successfully", response);
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error("Error sending verification email", error);
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
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    // In case of any error, log it and re-throw the error for proper handling
    console.error("Error sending welcome email", error);
    throw new Error(`Couldn't send welcome email: ${error.message}`);
  }
};
