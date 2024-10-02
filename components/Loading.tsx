import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

interface LoadingProps {
  size?: number;
  color?: string;
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 12,
  color = "currentColor",
  fullScreen = true,
  text,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen ? "h-screen" : "h-full",
        className
      )}
    >
      <Loader className={`size-${size} animate-spin text-${color}`} />
      {text && <p className="mt-4 text-sm text-gray-500">{text}</p>}
    </div>
  );
};

export default Loading;
