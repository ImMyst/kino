import { Link } from "@remix-run/react";
import { type ReactNode } from "react";

type TProps = {
  children: ReactNode;
  to: string;
};

export default function ReturnButton(props: TProps) {
  const { children, to } = props;

  return (
    <Link
      className="absolute top-4 left-4 text-center bg-gray-50 hover:bg-gray-100 transition-colors h-10 w-10
      flex items-center justify-center rounded-full p-2"
      to={to}
    >
      {children}
    </Link>
  );
}
