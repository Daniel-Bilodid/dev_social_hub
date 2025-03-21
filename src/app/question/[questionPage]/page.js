"use client";

import { React, useEffect, useState } from "react";
import { getQuestions, getResponses } from "@/utils/getQuestions";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import Image from "next/image";
import QuestionEditor from "@/components/questionEditor/QuestionEditor";
const QuestionPage = () => {
  const [usersQuestions, setUsersQuestions] = useState([]);
  const [usersResponses, setUsersResponses] = useState([]);
  const { questionPage } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getQuestions();

      setUsersQuestions(
        questions.find((item) => item.id === questionPage) || {}
      );
    };
    fetchQuestions();
  }, [questionPage]);

  useEffect(() => {
    const fetchResponses = async () => {
      const responses = await getResponses(questionPage);
      console.log("responses1", responses);

      setUsersResponses(responses);
    };
    fetchResponses();
  }, [questionPage]);

  console.log("responses", usersResponses);
  return (
    <div>
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex">
          <div>
            {usersQuestions.imageUrl ? (
              <Image
                src={usersQuestions.imageUrl}
                width={40}
                height={40}
                className="rounded-full"
                alt="user image"
              />
            ) : null}
          </div>
          <div>
            <div>{usersQuestions?.username}</div>
            <div>
              {usersQuestions.createdAt
                ? formatDistance(
                    usersQuestions.createdAt.toDate(),
                    new Date(),
                    { addSuffix: true }
                  )
                : "No Date"}
            </div>
          </div>
        </div>
        <h2 className="text-[24px]">{usersQuestions?.question}</h2>
        <div>{usersQuestions?.text}</div>
        {console.log(usersQuestions)}
        <ul className="flex gap-[10px]">
          {usersQuestions?.technology?.length > 0 ? (
            usersQuestions.technology.map((item) => (
              <li className="bg-gray-800 p-2 rounded-[10px]" key={item.value}>
                {item.value}
              </li>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
        {console.log(usersResponses)}
        <div>
          {usersResponses.map((response, index) => (
            <div key={index}>
              <div>
                <div className="flex">
                  {/* User Image */}
                  <div>
                    {response.imageUrl && (
                      <Image
                        src={response.imageUrl}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="User image"
                      />
                    )}
                  </div>

                  {/* Username and Timestamp */}
                  <div>
                    <div>{response?.username}</div>
                    <div>
                      {response.createdAt
                        ? formatDistance(
                            response.createdAt.toDate(),
                            new Date(),
                            {
                              addSuffix: true,
                            }
                          )
                        : "No Date"}
                    </div>
                  </div>
                </div>

                {/* Formatted Text Output */}
                <div>
                  {response.content?.[0]?.segments?.map((segment, index) => {
                    // Construct className dynamically based on format
                    const className = `
            ${segment.format?.bold ? "font-bold" : ""}
            ${segment.format?.underline ? "underline" : ""}
            ${segment.format?.italic ? "italic" : ""}
            ${segment.format?.strikethrough ? "line-through" : ""}
          `.trim();

                    return (
                      <span key={index} className={className}>
                        {segment.text}
                      </span>
                    );
                  }) || <p>No content available</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuestionEditor postId={questionPage} />
    </div>
  );
};

export default QuestionPage;
