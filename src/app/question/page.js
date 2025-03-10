import React from "react";

const Question = ({ questions }) => {
  return (
    <>
      {questions.map((question, index) => (
        <div className="w-full bg-red-50" key={index}>
          <div className="text-black">{question.question}</div>

          <ul>
            <li className="decoration-none text-black">
              {question.technology}
            </li>
          </ul>

          <div className="text-black flex justify-between">
            <div>User - asked 1 month ago</div>
            <div>Votes, Answers, Views</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Question;
