"use client";

import { useState, useEffect } from "react";
import { getTechnologies } from "@/utils/getTechnologies";

const useTechnologies = (tagName) => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    if (!tagName || (Array.isArray(tagName) && tagName.length === 0)) return;

    const fetchData = async () => {
      try {
        let data = [];

        if (Array.isArray(tagName)) {
          const promises = tagName.map((tag) => getTechnologies(tag));
          const results = await Promise.all(promises);
          data = results.flat();
        } else {
          data = await getTechnologies(tagName);
        }

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
