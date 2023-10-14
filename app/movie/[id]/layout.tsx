import Link from "next/link";
import { ReactNode } from "react";

export default function MovieLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full flex flex-col pt-4">
      <Link
        className="flex font-medium justify-center items-center mx-auto rounded-md py-1.5 px-2 hover:bg-blue-50 transition-colors"
        href={"/"}
      >
        Retour
      </Link>
      {children}
    </section>
  );
}
