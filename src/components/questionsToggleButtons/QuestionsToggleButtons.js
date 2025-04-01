import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { getResponses } from "@/utils/getQuestions";

const QuestionsToggleButtons = ({
  usersFilteredQuestions,
  setUsersFilteredQuestions,
}) => {
  const [activeButton, setActiveButton] = useState("Newest");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      const fetchedResponses = await Promise.all(
        usersFilteredQuestions.map((q) => getResponses(q.id))
      );
      setResponses(fetchedResponses);
    }

    fetchResponses();
  }, [usersFilteredQuestions]);

  function toggleQuestion(label) {
    setActiveButton(label);

    if (activeButton === "Unanswered") {
      console.log("hello");
      const sortedUsers = [...usersFilteredQuestions].filter(
        (question, index) => {
          responses.forEach((item) => {
            console.log("here", item.includes(question.userId));
          });
        }
      );
    }

    const sortedUsers = [...usersFilteredQuestions].sort((a, b) =>
      activeButton === "Newest"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt
    );

    setUsersFilteredQuestions(sortedUsers);
    console.log(usersFilteredQuestions);
    console.log("res", responses);
  }
  useEffect(() => {
    toggleQuestion(activeButton);
    console.log("test"); //////////////
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: "10px",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {["Newest", "Oldest", "Unanswered"].map((label) => (
            <Button
              key={label}
              onClick={() => toggleQuestion(label)}
              variant={activeButton === label ? "contained" : "outlined"}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default QuestionsToggleButtons;
