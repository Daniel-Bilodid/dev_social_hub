"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MdOutlineHome } from "react-icons/md";
import { LuFileQuestion } from "react-icons/lu";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiCommunityLine } from "react-icons/ri";
import { IoBookmarksOutline } from "react-icons/io5";

const SideMenu = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  return (
    <div className="w-64  text-white p-4 fixed top-22">
      <Stack spacing={3} direction="column">
        <Button
          variant="outline"
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            backgroundColor: isActive("/") ? "var(--color-third)" : "",
          }}
        >
          <Link href="/" className=" flex items-center gap-[10px]">
            <MdOutlineHome size={20} />{" "}
            <span className="text-[18px] font-bold">Home</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            backgroundColor: isActive("/questions") ? "var(--color-third)" : "",
          }}
        >
          <Link href="/questions" className=" flex items-center gap-[10px]">
            <LuFileQuestion size={20} />
            <span className="text-[18px] font-bold">Questions</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            backgroundColor: isActive("/tags") ? "var(--color-third)" : "",
          }}
        >
          <Link href="/tags" className=" flex items-center gap-[10px]">
            <IoPricetagsOutline size={20} />{" "}
            <span className="text-[18px] font-bold">Tags</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            backgroundColor: isActive("/favorite") ? "var(--color-third)" : "",
          }}
        >
          <Link href="/favorite" className="flex items-center gap-[10px]">
            <IoBookmarksOutline size={20} />{" "}
            <span className="text-[18px] font-bold">Favorite</span>
          </Link>
        </Button>
      </Stack>
    </div>
  );
};

export default SideMenu;
