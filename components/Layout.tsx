import Link from "next/link";
import type { FC, ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import styles from "styles/Layout.module.css";
import Polly from "../public/polly.svg";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-stretch bg-gray-700 text-white">
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#6dd5ed" offset="0%" />
          <stop stopColor="#2193b0" offset="100%" />
        </linearGradient>
      </svg>
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/">
          <a className={`flex items-center text-2xl font-bold`}><Polly className="fill-white mr-1" />Polly</a>
        </Link>
        <a href="https://github.com/viethung7899/polly" className="text-2xl p-1">
          <FaGithub />
        </a>
      </div>
      <div className="flex-1 bg-gray-800">
        {children}
      </div>
      {/* Footer */}
      <div className="text-center p-2">
        Made with <a href="https://nextjs.org/" className={styles.link}>Next</a>
        &nbsp;and <a href="https://www.prisma.io/" className={styles.link}>Prisma</a>
      </div>
    </div>
  )
};

export default Layout;