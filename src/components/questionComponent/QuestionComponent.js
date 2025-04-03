import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Image from "next/image";

const QuestionComponent = ({ questions, responses }) => {
  return (
    <>
      {questions.map((question, index) => (
        <div
          className="w-full bg-secondary p-7 px-9
mt-[20px] rounded-[20px]"
          key={question.id}
        >
          <Link href={`/question/${question.id}`} className="text-font ">
            {question.question}
          </Link>
          <ul className="flex gap-[10px]">
            {question?.technology?.map((technology, index) => {
              return (
                <li
                  key={index}
                  className="decoration-none text-font bg-third p-2 rounded-[10px]"
                >
                  {technology.value}
                </li>
              );
            })}
          </ul>

          <div className="text-font flex justify-between">
            <div className="flex">
              <div>
                <Image
                  src={question.imageUrl}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user image"
                />
              </div>
              {question?.username} - asked{" "}
              {question.createdAt
                ? formatDistance(question.createdAt.toDate(), new Date(), {
                    addSuffix: true,
                  })
                : "No Date"}
            </div>
            <div className="flex">
              Votes <AiOutlineLike />,
              {responses ? responses[index]?.length : "0"} Answers{" "}
              <FaRegComment />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionComponent;
