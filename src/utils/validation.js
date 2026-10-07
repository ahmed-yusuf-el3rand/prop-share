function validateFullName(fullName) {
  const FULL_NAME_PATTERN = /^[a-zA-Z\s]+$/;
  return FULL_NAME_PATTERN.test(fullName);
}

function validateEmail(email) {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_PATTERN.test(email);
}

function validatePassword(password) {
  const PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return PASSWORD_PATTERN.test(password);
}

function validateLoginForm(email, password) {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return "Please fill in all required fields.";
  }

  const isValidEmail = validateEmail(trimmedEmail);
  const isValidPassword = validatePassword(trimmedPassword);

  if (!isValidEmail) {
    return "Please enter a valid email address.";
  }

  if (!isValidPassword) {
    return "Password must be at least 8 characters long and contain letters, numbers and special characters.";
  }
  return null;
}

function validateSignupForm(fullName, email, password) {
  const trimmedFullName = fullName.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
    return "Please fill in all required fields.";
  }

  if (!validateFullName(trimmedFullName)) {
    return "Full name can only contain letters and spaces.";
  }

  if (!validateEmail(trimmedEmail)) {
    return "Please enter a valid email address.";
  }
  if (!validatePassword(trimmedPassword)) {
    return "Password must be at least 8 characters long and contain letters, numbers and special characters.";
  }
  return null;
}

function validateResetPasswordForm(newPassword, confirmNewPassword) {
  const trimmedNewPassword = newPassword.trim();
  const trimmedConfirmNewPassword = confirmNewPassword.trim();

  if (!trimmedNewPassword || !trimmedConfirmNewPassword) {
    return "Please fill in all required fields.";
  }

  if (!validatePassword(trimmedNewPassword)) {
    return "Password must be at least 8 characters long and contain letters, numbers and special characters.";
  }

  if (trimmedNewPassword !== trimmedConfirmNewPassword) {
    return "Passwords do not match";
  }
  return null;
}

function validateSearchInput(searchValue) {
  const trimmed = searchValue.trim();
  if (!trimmed) return "Location is required.";
  if (trimmed.length < 4) return "Please enter at least 4 characters.";
  return null;
}

function validateChangePasswordForm(
  oldPasswordRef,
  newPasswordRef,
  confirmPasswordRef,
) {
  const oldPwd = oldPasswordRef.current.value.trim();
  const newPwd = newPasswordRef.current.value.trim();
  const confirmPwd = confirmPasswordRef.current.value.trim();
  if (!oldPwd) {
    return "Please enter your current password.";
  }
  if (!validatePassword(newPwd)) {
    return "New password must be at least 8 characters and secure.";
  }
  if (newPwd !== confirmPwd) {
    return "New password and confirmation do not match.";
  }
  return null;
}

function validateUserInformationForm(formData) {
  const trimmedName = formData.fullName.trim();
  const trimmedEmail = formData.email.trim();
  if (!validateFullName(trimmedName)) {
    return "Please enter a valid name.";
  }
  if (!validateEmail(trimmedEmail)) {
    return "Please enter a valid email address.";
  }
  return null;
}

export {
  validateEmail,
  validateLoginForm,
  validateSignupForm,
  validateSearchInput,
  validateResetPasswordForm,
  validateChangePasswordForm,
  validateUserInformationForm
};
