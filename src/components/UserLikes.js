import React from "react";
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
const UserLikes = () => {
  return (
    <div className="flex">
      <div className="flex">
        <LuArrowBigUp size={25} className="cursor-pointer" /> <span>0</span>
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
