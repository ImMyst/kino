import { cn } from "@app/utils/cn";
import type { ReactNode } from "react";

type TProps = {
  className?: string;
  children: ReactNode;
};

export default function Badge(props: TProps) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "items-center rounded-md border px-2.5 py-0.5",
        "text-xs font-semibold transition-colors focus:outline-none",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-300",
        "text-gray-950 shadow hover:bg-gray-300/80",
        className
      )}
    >
      {children}
    </div>
  );
}
