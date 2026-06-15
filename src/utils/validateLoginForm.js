import { validateEmail, validatePassword } from "../utils/validation";

export default function validateLoginForm(email, password) {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return "Please enter both email and password.";
  }

  const isValidEmail = validateEmail(trimmedEmail);
  const isValidPassword = validatePassword(trimmedPassword);

  if (!isValidEmail) {
    return "Please enter a valid email address.";
  }

  if (!isValidPassword) {
    return "Password must be at least 8 characters long and contain letters, numbers and special characters.";
  }
}
