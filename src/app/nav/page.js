"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import SideMenu from "../side-menu/page";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

import { signIntoFirebaseWithClerk } from "../firebase/page";

const Nav = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      signIntoFirebaseWithClerk(getToken);
    }
  }, [isSignedIn]);

  return (
    <div className="flex h-screen flex-col">
      <div className="bg-gray-900 dark:bg-gray-800 p-6 shadow-md flex items-center justify-between">
        <div className="text-2xl font-bold text-white">DevHub</div>

        <div className="relative w-full max-w-[600px]">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-10 py-2 rounded-md border border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <div className="cursor-pointer text-white dark:text-white hover:text-indigo-500 w-[40px] h-[40px] bg-gray-600 flex items-center justify-center rounded-[5px]">
                <CgProfile className="w-6 h-6" />
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-64 bg-gray-900 dark:bg-gray-800">
          <SideMenu />
        </div>

        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Nav;
