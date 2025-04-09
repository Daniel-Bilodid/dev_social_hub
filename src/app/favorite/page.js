"use client";

import React, { useState, useEffect } from "react";

import { useAuth } from "@clerk/nextjs";
import getFavorites from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import Question from "../question/page";
import getQuestionsById from "@/utils/getQuestions";

function FavoritePage() {
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  }, [userId, router]);
  console.log("user", userId);

  const fetchFavorites = async () => {
    try {
      const favoritesData = await getFavorites(userId);
      console.log("Fetched favorites:", favoritesData);
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  console.log("hello", favorites);
  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  useEffect(() => {
    if (favorites.length > 0) {
      fetchPostById();
    }
  }, [favorites]);

  const fetchPostById = async () => {
    try {
      const postsArr = await Promise.all(
        favorites.map((favorite) => getQuestionsById(favorite.postId))
      );
      const flattenedPosts = postsArr.flat();
      console.log("Fetched posts:", flattenedPosts);
      setPosts(flattenedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      <h1>FavoritePage</h1>
      <Question questions={posts} user={user} />
    </div>
  );
}

export default FavoritePage;
