import { cn } from "@app/utils/cn";
import type { ReactNode } from "react";

type TProps = {
  className?: string;
  variant?: "default" | "blue" | "red" | "blurred";
  children: ReactNode;
};

export default function Badge(props: TProps) {
  const { variant = "default", children, className } = props;
  return (
    <div
      className={cn(
        "items-center rounded-md border px-2.5 py-0.5",
        "text-xs font-semibold transition-colors focus:outline-none",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "shadow",
        {
          "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-100/80":
            variant === "default",
          "bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-100/80":
            variant === "blue",
          "bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-100/80":
            variant === "red",
          "backdrop-blur-md bg-white/60 border-white text-black":
            variant === "blurred",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
