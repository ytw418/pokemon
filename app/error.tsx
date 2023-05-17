"use client";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div>
      <p>서버에 문제가 있습니다. 잠시 후 다시 시도해주세요</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
