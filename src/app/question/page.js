import React from "react";

const Question = ({ questions }) => {
  if (!Array.isArray(questions)) {
    return <div>No questions found</div>;
  }
  console.log("1", questions);
  return (
    <>
      {questions.map((question) => (
        <div className="w-full bg-red-50" key={question.id}>
          <div className="text-black">{question.question}</div>

          <ul>
            <li className="decoration-none text-black">
              {question.technology}
            </li>
          </ul>

          <div className="text-black flex justify-between">
            <div>
              User - asked{" "}
              {question.createdAt
                ? question.createdAt.toDate().toLocaleString()
                : "No Date"}
            </div>
            <div>Votes, Answers, Views</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Question;
