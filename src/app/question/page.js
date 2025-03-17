import React from "react";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
const Question = ({ questions, user }) => {
  if (!Array.isArray(questions)) {
    return <div>No questions found</div>;
  }

  return (
    <>
      {questions.map((question, index) => (
        <div
          className="w-full bg-gray-800 p-9 mt-[20px] rounded-[20px]"
          key={question.id}
        >
          <div className="text-white">{question.question}</div>

          <ul className="flex gap-[10px]">
            {question.technology.map((technology, index) => {
              return (
                <li key={index} className="decoration-none text-white">
                  {technology.value}
                </li>
              );
            })}
          </ul>

          <div className="text-white flex justify-between">
            <div className="flex">
              <div>
                <Image
                  src={user.imageUrl}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user image"
                />
              </div>
              {user?.username} - asked{" "}
              {question.createdAt
                ? question.createdAt.toDate().toLocaleString()
                : "No Date"}
            </div>
            <div>
              Votes <AiOutlineLike />, Answers <FaRegComment />, Views
              <FaRegEye />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Question;
