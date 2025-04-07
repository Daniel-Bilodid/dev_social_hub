"use client";

import React, { useState } from "react";
import ButtonsToggleGroup from "../buttonsToggleGroup/ButtonsToggleGroup";

function TagsToggleButtons({ tags, setDisplayTag, tagCounts, filteredTags }) {
  const [activeButton, setActiveButton] = useState("New");
  const [filters, setFilters] = useState(["New", "Name", "Popular"]);

  function toggleQuestion(label) {
    setActiveButton(label);
    console.log(label);

    if (label === "Popular") {
      const sortedTags = filteredTags
        .filter((tag) => tagCounts[tag] !== null)
        .sort((a, b) => tagCounts[b] - tagCounts[a]);
      setDisplayTag(sortedTags);
    }

    if (label === "Name") {
      const sortedTags = filteredTags.sort();
      setDisplayTag(sortedTags);
    }
    console.log("tagsCounts", tagCounts.CSS);
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
