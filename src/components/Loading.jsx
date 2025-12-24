import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex-center">
      <LoaderCircle size={50} className="text-primary animate-spin" />
    </div>
  );
};

export default Loading;
