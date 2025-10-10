import * as Sentry from "@sentry/nextjs";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonValue[]
  | { [key: string]: JsonValue };

interface ErrorContext {
  [key: string]: JsonValue;
}

export function handleServerActionError(
  error: unknown,
  action: string,
  context: ErrorContext = {}
): string {
  Sentry.captureException(error, {
    tags: { action, serverAction: true },
    extra: context,
  });

  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }
  return "An unknown error occurred";
}

export function handleQueryError(
  error: unknown,
  queryKey: string | string[],
  context: ErrorContext = {}
): void {
  const keyString = Array.isArray(queryKey) ? queryKey.join(".") : queryKey;

  Sentry.captureException(error, {
    tags: {
      queryKey: keyString,
      errorType: "react-query",
      environment: "client",
    },
    extra: context,
  });
}

export function handlePrefetchError(
  error: unknown,
  queryKey: string | string[],
  context: ErrorContext = {}
): void {
  const keyString = Array.isArray(queryKey) ? queryKey.join(".") : queryKey;

  Sentry.captureException(error, {
    tags: {
      queryKey: keyString,
      errorType: "prefetch",
      environment: "server",
    },
    extra: context,
    level: "warning",
  });
}

export function createQueryErrorHandler(queryName: string) {
  return (error: unknown) => {
    handleQueryError(error, queryName, {
      timestamp: new Date().toISOString(),
    });
  };
}
