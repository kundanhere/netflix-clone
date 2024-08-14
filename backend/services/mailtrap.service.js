import {
  mailtrapClient,
  SENDER,
  EMAIL_TEMPLATE_IDS,
  EMAIL_TEMPLATE_VARIABLES,
} from "../config/mailtrap.config.js";

// when user signup an account,
// send a verification email with verification code to the specified email address.
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
