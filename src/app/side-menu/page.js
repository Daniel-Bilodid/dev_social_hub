"use client";

import React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MdOutlineHome } from "react-icons/md";
import { LuFileQuestion } from "react-icons/lu";
import { FaTags } from "react-icons/fa";
import { RiCommunityLine } from "react-icons/ri";
import { IoBookmarksOutline } from "react-icons/io5";

const SideMenu = () => {
  return (
    <div className="w-64 bg-secondary text-white p-4">
      <Stack spacing={3} direction="column">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--color-third)",
            "&:hover": {
              backgroundColor: "var(--color-third-hover)",
            },
          }}
        >
          <Link href="/" className=" flex">
            <MdOutlineHome /> Home
          </Link>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--color-third)",
            "&:hover": {
              backgroundColor: "var(--color-third-hover)",
            },
          }}
        >
          <Link href="/questions" className=" flex">
            <LuFileQuestion /> Questions
          </Link>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--color-third)",
            "&:hover": {
              backgroundColor: "var(--color-third-hover)",
            },
          }}
        >
          <Link href="/tags" className=" flex">
            <FaTags /> Tags
          </Link>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--color-third)",
            "&:hover": {
              backgroundColor: "var(--color-third-hover)",
            },
          }}
        >
          <Link href="/favorite" className=" flex">
            <IoBookmarksOutline /> Favorite
          </Link>
        </Button>
      </Stack>
    </div>
  );
};

export default SideMenu;
