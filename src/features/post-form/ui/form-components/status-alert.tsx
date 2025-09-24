interface StatusAlertProps {
  status: { type: "success" | "error"; message: string } | null;
}

export function StatusAlert({ status }: StatusAlertProps) {
  if (!status) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mb-4 rounded-md px-4 py-3 text-sm ${
        status.type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      {status.message}
    </div>
  );
}
