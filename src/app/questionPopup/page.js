import React, { useState } from "react";
import Select from "react-select";
const AskQuestionPopup = ({ setPopupToggle, addQuestion }) => {
  const [question, setQuestion] = useState("");
  const [technology, setTechnology] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (question && technology) {
      const newQuestion = { question, technology, text };
      addQuestion(newQuestion);
      setPopupToggle(false);
    }

    console.log("Question:", question);
    console.log("Technology:", technology);
  };

  const options = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
  ];

  return (
    <div className="fixed inset-0 bg-[rgba(31,41,55,0.5)] flex justify-center items-center z-50">
      <div className="bg-secondary  p-6 rounded-lg w-[600px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-white">
              Your Question:
            </label>
            <input
              type="text"
              id="question"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-2 border border-third rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="question" className="block text-font">
              Add more about your question:
            </label>
            <textarea
              type="text"
              id="question"
              rows="10"
              cols="50"
              placeholder="Add more about your question..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 border border-third rounded-md"
            />
          </div>
          <div className="w-64">
            <Select
              defaultValue={"meow"}
              isMulti
              name="colors"
              options={options}
              value={technology}
              onChange={setTechnology}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setPopupToggle(false)}
              className="px-4 py-2 bg-third text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-third text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionPopup;
