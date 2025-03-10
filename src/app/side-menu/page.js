"use client";

import React from "react";
import Link from "next/link";

const SideMenu = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/questions" className="hover:text-blue-400">
            Questions
          </Link>
        </li>
        <li>
          <Link href="/tags" className="hover:text-blue-400">
            Tags
          </Link>
        </li>
        <li>
          <Link href="/users" className="hover:text-blue-400">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
