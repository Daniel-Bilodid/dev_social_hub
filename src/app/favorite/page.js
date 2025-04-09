"use client";

import React, { useState, useEffect } from "react";

import { useAuth } from "@clerk/nextjs";
import getFavorites from "@/utils/actions";
import { useRouter } from "next/navigation";

function FavoritePage() {
  const router = useRouter();
  const { userId } = useAuth();
  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  }, [userId, router]);
  console.log("user", userId);

  const fetchFavorites = async () => {
    if (userId) {
      const favorites = await getFavorites(userId);
      console.log(favorites);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  return <div>FavoritePage</div>;
}

export default FavoritePage;
