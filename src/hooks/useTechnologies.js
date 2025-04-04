"use client";

import { useState, useEffect } from "react";
import { getTechnologies } from "@/utils/getTechnologies";

const useTechnologies = (tagName) => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    if (!tagName) return;

    const fetchData = async () => {
      try {
        const data = await getTechnologies(tagName);
        setTechnologies(data);
      } catch (err) {
        console.error("Error fetching technologies:", err);
      }
    };

    fetchData();
  }, [tagName]);

  return technologies;
};

export default useTechnologies;
