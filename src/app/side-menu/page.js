"use client";

import React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MdOutlineHome } from "react-icons/md";
import { LuFileQuestion } from "react-icons/lu";
import { FaTags } from "react-icons/fa";
import { RiCommunityLine } from "react-icons/ri";

const SideMenu = () => {
  return (
    <div className="w-64 bg-[#387478] text-white p-4">
      <Stack spacing={3} direction="column">
        <Button variant="contained">
          <Link href="/" className="hover:text-blue-400 flex">
            <MdOutlineHome /> Home
          </Link>
        </Button>
        <Button variant="contained">
          <Link href="/questions" className="hover:text-blue-400 flex">
            <LuFileQuestion /> Questions
          </Link>
        </Button>
        <Button variant="contained">
          <Link href="/tags" className="hover:text-blue-400 flex">
            <FaTags /> Tags
          </Link>
        </Button>
        <Button variant="contained">
          <Link href="/community" className="hover:text-blue-400 flex">
            <RiCommunityLine /> Community
          </Link>
        </Button>
      </Stack>
    </div>
  );
};

export default SideMenu;
