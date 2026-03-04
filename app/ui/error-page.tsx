"use client";
import Alert from "../ui/alert";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert
      variant="error"
      messageHeader={`${"Error"} (${error.name})`}
      className="w-max m-auto"
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
