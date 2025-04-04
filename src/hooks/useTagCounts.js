"use client";

import { useEffect, useState } from "react";
import { getTechnologies } from "@/utils/getTechnologies";

const useTagCounts = (tags) => {
  const [tagCounts, setTagCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      const counts = {};

      await Promise.all(
        tags.map(async (tag) => {
          const posts = await getTechnologies(tag);
          counts[tag] = posts.length;
        })
      );

      setTagCounts(counts);
    };

    fetchCounts();
  }, [tags]);

  return tagCounts;
};

export default useTagCounts;
