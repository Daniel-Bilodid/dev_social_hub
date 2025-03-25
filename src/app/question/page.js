import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { getResponses } from "@/utils/getQuestions";

const Question = ({ questions, user }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      const fetchedResponses = await Promise.all(
        questions.map((q) => getResponses(q.id))
      );
      setResponses(fetchedResponses);
    }

    fetchResponses();
  }, [questions]);

  if (!Array.isArray(questions)) {
    return <div>No questions found</div>;
  }

  return (
    <>
      {questions.map((question, index) => (
        <div
          className="w-full bg-gray-800 p-7 px-9
 mt-[20px] rounded-[20px]"
          key={question.id}
        >
          <Link href={`/question/${question.id}`} className="text-white ">
            {question.question}
          </Link>

          <ul className="flex gap-[10px]">
            {question?.technology?.map((technology, index) => {
              return (
                <li
                  key={index}
                  className="decoration-none text-white bg-gray-900 p-2 rounded-[10px]"
                >
                  {technology.value}
                </li>
              );
            })}
          </ul>

          <div className="text-white flex justify-between">
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

export default Question;
