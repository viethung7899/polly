import Link from "next/link";
import type { FC, ReactNode } from "react";
import { FaGithub } from "react-icons/fa";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-stretch">
      {/* Navbar */}
      <div className="flex items-center justify-between p-2 border-b-2">
        <Link href="/">
          <a className="text-2xl font-bold">Polly</a>
        </Link>
        <a href="https://github.com/viethung7899/polly" className="text-2xl p-1 rounded-md hover:bg-gray-300">
          <FaGithub />
        </a>
      </div>
      <div className="flex-1">
        {children}
      </div>
      {/* Footer */}
      <div className="text-center border-t-2">Made with Next and Prisma</div>
    </div>
  )
};

export default Layout;