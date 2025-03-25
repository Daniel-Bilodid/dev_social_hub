"use client";

import { React, useEffect, useState, useCallback } from "react";
import { getQuestions, getResponses } from "@/utils/getQuestions";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import Image from "next/image";
import QuestionEditor from "@/components/questionEditor/QuestionEditor";

import UserLikes from "@/components/UserLikes";
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

  const fetchResponses = useCallback(async () => {
    const responses = await getResponses(questionPage);
    setUsersResponses(responses);
  }, [questionPage]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  const handleNewResponse = () => {
    fetchResponses();
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex justify-between">
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
          <UserLikes />
        </div>
        <h2 className="text-[24px]">{usersQuestions?.question}</h2>
        <div>{usersQuestions?.text}</div>

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

        <div>
          {usersResponses.map((response, index) => (
            <div key={index}>
              <div>
                <div className="flex">
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

                <div>
                  {response.content.length > 0 ? (
                    response.content.map((content, index) => (
                      <div key={index}>
                        {content?.segments?.length > 0 ? (
                          content.segments.map((segment, segIndex) => {
                            const className = `
            ${segment.format?.bold ? "font-bold" : ""}
            ${segment.format?.underline ? "underline" : ""}
            ${segment.format?.italic ? "italic" : ""}
            ${segment.format?.strikethrough ? "line-through" : ""}
          `.trim();

                            return (
                              <span key={segIndex} className={className}>
                                {segment.text}
                              </span>
                            );
                          })
                        ) : (
                          <p>No segments available</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuestionEditor postId={questionPage} onNewResponse={handleNewResponse} />
    </div>
  );
};

export default QuestionPage;
