import React, { useState } from "react";

const AskQuestionPopup = ({ setPopupToggle, addQuestion }) => {
  const [question, setQuestion] = useState("");
  const [technology, setTechnology] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (question && technology) {
      const newQuestion = { question, technology };
      addQuestion(newQuestion);
      setPopupToggle(false);
    }

    console.log("Question:", question);
    console.log("Technology:", technology);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700">
              Your Question:
            </label>
            <input
              type="text"
              id="question"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="technology" className="block text-gray-700">
              Choose Technology:
            </label>
            <select
              id="technology"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Technology</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JS">JavaScript</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setPopupToggle(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
