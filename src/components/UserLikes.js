import React, { useState, useEffect } from "react";
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import AddToFavorite from "@/utils/addToFavorite";
import { useAuth } from "@clerk/nextjs";

const UserLikes = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (isBookmarked) {
      AddToFavorite(postId, userId);
    }
  }, [isBookmarked]);

  const handleUserInteraction = (type) => {
    switch (type) {
      case "like":
        if (isDisliked) setIsDisliked(false);
        setIsLiked((prev) => !prev);
        break;
      case "dislike":
        if (isLiked) setIsLiked(false);
        setIsDisliked((prev) => !prev);
        break;
      case "bookmark":
        setIsBookmarked((prev) => !prev);

        break;
      default:
        break;
    }
  };

  return (
    <div className="flex">
      <div
        className="cursor-pointer flex"
        onClick={() => handleUserInteraction("like")}
      >
        <LuArrowBigUp
          size={25}
          className={`cursor-pointer ${
            isLiked ? "text-blue-500" : "text-gray-500"
          }`}
        />
        <span>{isLiked ? 1 : 0}</span>
      </div>
      <div className="flex" onClick={() => handleUserInteraction("dislike")}>
        <LuArrowBigDown size={25} className="cursor-pointer" /> <span>0</span>
      </div>
      <div>
        <CiStar
          size={25}
          onClick={() => handleUserInteraction("bookmark")}
          className={`cursor-pointer ${
            isBookmarked ? "text-amber-300" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
};

export default UserLikes;
