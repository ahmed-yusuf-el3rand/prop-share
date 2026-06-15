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

export {
  validateFullName,
  validateEmail,
  validatePassword,
};
