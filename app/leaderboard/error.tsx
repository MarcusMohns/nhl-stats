"use client"; // Error boundaries must be Client Components
import Alert from "../ui/alert";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Alert
      messageHeader={`${"Error"} (${error.name})`}
      bgColor="bg-red-100"
      borderColor="border-red-500"
      textColor="text-red-700"
    >
      <p>{error.message}</p>
      <button
        onClick={reset}
        className="border font-bold m-2 border-red-700 p-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer"
      >
        Retry
      </button>
    </Alert>
  );
}
