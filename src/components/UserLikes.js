import React, { useState } from "react";
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
const UserLikes = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // check for user if he already upvoted and after that perform firebase request with postId

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
      <div className="flex">
        <LuArrowBigDown size={25} className="cursor-pointer" /> <span>0</span>
      </div>
      <div>
        <CiStar size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default UserLikes;
