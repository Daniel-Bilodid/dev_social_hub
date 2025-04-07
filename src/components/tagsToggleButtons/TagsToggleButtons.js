"use client";

import React, { useState } from "react";
import ButtonsToggleGroup from "../buttonsToggleGroup/ButtonsToggleGroup";

function TagsToggleButtons() {
  const [activeButton, setActiveButton] = useState("New");
  const [filters, setFilters] = useState(["New", "Name", "Popular"]);

  function toggleQuestion(label) {
    setActiveButton(label);
    console.log(label);
  }
  return (
    <ButtonsToggleGroup
      filters={filters}
      toggleQuestion={toggleQuestion}
      activeButton={activeButton}
    />
  );
}

export default TagsToggleButtons;
