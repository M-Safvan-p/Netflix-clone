export class AuthError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const validateCredentials = (email, password) => {
  if (!email || !password) {
    throw new AuthError("Email and password are required", "VALIDATION");
  }

  if (!email.includes("@")) {
    throw new AuthError("Invalid email address", "VALIDATION");
  }

  if (password.length < 6) {
    throw new AuthError("Password must be at least 6 characters", "VALIDATION");
  }

  return {
    email: email.trim().toLowerCase(),
    password,
  };
};