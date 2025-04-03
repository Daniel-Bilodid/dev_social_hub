"use client";

import { useEffect, useState } from "react";
import React from "react";
import { getTechnologies } from "@/utils/getTechnologies";
import Link from "next/link";

const Tags = () => {
  const [technologies, setTechnologies] = useState([]);
  const [tag, setTag] = useState("");

  const fetchTechnologies = async (item) => {
    try {
      setTag(item);
      console.log("tag", item);
      const fetchedTechnologies = await getTechnologies(item);
      setTechnologies(fetchedTechnologies);
      console.log(fetchedTechnologies);
      console.log(technologies);
    } catch (error) {
      console.error("Ошибка при получении технологий:", error);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return (
    <div>
      Tags
      <Link href={`/tags/${tag}`} onClick={() => fetchTechnologies("React")}>
        React
      </Link>
    </div>
  );
};

export default Tags;
