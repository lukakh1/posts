import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginInputs, SignupInputs } from "../../models";
import { signInWithEmail, signInWithGmail, signUpNewUser } from "./auth.api";

type AuthType = "signin" | "signup" | "google";
type AuthData = LoginInputs | SignupInputs;

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signInMutation = useMutation({
    mutationFn: signInWithEmail,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const signUpMutation = useMutation({
    mutationFn: signUpNewUser,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const googleSignInMutation = useMutation({
    mutationFn: signInWithGmail,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess(data: { success: boolean; error?: string } | void) {
    if (data?.success) {
      router.push(searchParams.get("redirectTo") || "/");
    } else if (data?.error) {
      setErrorMessage(
        data?.error || "Authentication failed. Please try again."
      );
    }
  }

  function handleError(error: { message: string }) {
    setErrorMessage(
      error.message || "Authentication failed. Please try again."
    );
  }

  const authenticate = (type: AuthType, data?: AuthData) => {
    setErrorMessage(null);

    switch (type) {
      case "signin":
        signInMutation.mutate(data as LoginInputs);
        break;
      case "signup":
        signUpMutation.mutate(data as SignupInputs);
        break;
      case "google":
        googleSignInMutation.mutate();
        break;
    }
  };

  const isLoading =
    signInMutation.isPending ||
    signUpMutation.isPending ||
    googleSignInMutation.isPending;

  return {
    authenticate,
    errorMessage,
    setErrorMessage,
    isLoading,
    mutations: {
      signIn: signInMutation,
      signUp: signUpMutation,
      googleSignIn: googleSignInMutation,
    },
  };
};
