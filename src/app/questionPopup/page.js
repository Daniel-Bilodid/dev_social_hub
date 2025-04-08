import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import addTags from "@/utils/addTags";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

const AskQuestionPopup = ({ setPopupToggle, addQuestion }) => {
  const [question, setQuestion] = useState("");
  const [technology, setTechnology] = useState([]);

  const [text, setText] = useState("");
  const { userId } = useAuth();
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("technology", technology);
    console.log("user", user);
    console.log("userId", userId);
    if (question && technology) {
      const technologyValues = technology.map((item) => item.value);
      const newQuestion = { question, technology: technologyValues, text };

      addQuestion(newQuestion);
      addTags(technology, userId, user);
      setPopupToggle(false);
    }
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
            <Autocomplete
              multiple
              freeSolo
              options={options}
              value={technology}
              onChange={(event, newValue) => {
                const updatedTechnologies = newValue.map((item) =>
                  typeof item === "string" ? { value: item, label: item } : item
                );
                setTechnology(updatedTechnologies);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const label =
                    typeof option === "string" ? option : option.label;
                  const key =
                    typeof option === "string" ? option : option.value;
                  return (
                    <Chip
                      variant="outlined"
                      label={label}
                      {...getTagProps({ index })}
                      key={key}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Enter tags"
                  placeholder="Tags"
                />
              )}
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
