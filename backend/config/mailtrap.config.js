import { MailtrapClient } from "mailtrap";
import { ENV_VARS } from "./env.config.js";

// Mailtrap API token and endpoint
const token = ENV_VARS.MAILTRAP_TOKEN;
const endpoint = ENV_VARS.MAILTRAP_ENDPOINT;

// Mailtrap client configuration
export const mailtrapClient = new MailtrapClient({ endpoint, token });

// Email Sender
export const SENDER = {
  email: "netflixclone@demomailtrap.com",
  name: "Netflix Clone",
};

// Template UUIDs
export const EMAIL_TEMPLATE_IDS = {
  verification_email: "8168646a-586c-4e1e-a0c9-087bb1b46665",
  welcome_email: "00eecab8-06f1-42fa-a67c-45e7bd7a3d42",
};

// Template variables
export const EMAIL_TEMPLATE_VARIABLES = {
  name: "Test_Name",
  phone: "000000",
  company_info_name: "Netflix Clone",
  company_info_address: "Laxmi Nagar",
  company_info_city: "New Delhi",
  company_info_zip_code: "110091",
  company_info_country: "India",
};
