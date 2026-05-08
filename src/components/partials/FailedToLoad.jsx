import { AlertCircle } from "lucide-react";
import { useState } from "react";
import PrimaryButton from "../ui/buttons/PrimaryButton";

const FailedToLoad = ({
  title = "Something went wrong",
  message = "We couldn't load this content. This might be a network issue or a temporary server problem.",
  errorCode = null,
  redirectTo,
  btnText = "Go to dashboard",
}) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    setRetrying(true);
    await redirectTo?.();
    setRetrying(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-950 animate-ping opacity-20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-7 w-7 text-red-500" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed mb-6">
        {message}
      </p>

      {/* Actions */}
      {redirectTo && (
        <PrimaryButton onClick={handleRetry} disabled={retrying}>
          {btnText}
        </PrimaryButton>
      )}

      {/* Error code */}
      {errorCode && (
        <p className="mt-4 text-xs font-mono text-neutral-400 dark:text-neutral-600">
          {errorCode}
        </p>
      )}
    </div>
  );
};

export default FailedToLoad;
