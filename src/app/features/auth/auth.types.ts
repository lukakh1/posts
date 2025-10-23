export type AuthType = "login" | "signup";

export interface AuthConfig {
  title: string;
  submitText: string;
  loadingText: string;
  successMessage: string;
  errorMessage: string;
}

export const AUTH_CONFIGS: Record<AuthType, AuthConfig> = {
  login: {
    title: "Sign In",
    submitText: "Sign In",
    loadingText: "Signing In...",
    successMessage: "Successfully signed in.",
    errorMessage: "Failed to sign in.",
  },
  signup: {
    title: "Sign Up",
    submitText: "Sign Up",
    loadingText: "Signing Up...",
    successMessage: "Successfully signed up.",
    errorMessage: "Failed to sign up.",
  },
};
