import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function ButtonsToggleGroup({ filters, toggleQuestion, activeButton }) {
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
          {filters.map((label) => (
            <Button
              sx={{
                backgroundColor:
                  activeButton === label
                    ? "var(--color-secondary)"
                    : "var(--color-third)",
                borderColor: "var(--color-secondary)",
                color: "var(--color-font)",
                "&:hover": {
                  backgroundColor:
                    activeButton === label
                      ? "var(--color-secondary-hover)"
                      : "var(--color-third-hover)",
                },
              }}
              key={label}
              onClick={() => toggleQuestion(label)}
              variant="contained"
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default ButtonsToggleGroup;
