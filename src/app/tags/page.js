"use client";

import React, { useMemo } from "react";

import Link from "next/link";
import useTagCounts from "@/hooks/useTagCounts";

const Tags = () => {
  const tags = useMemo(() => ["HTML", "CSS", "JavaScript", "React"], []);
  const tagCounts = useTagCounts(tags);
  console.log("count", tagCounts);
  return (
    <div>
      <h2 className="text-red-100">All Tags</h2>
      <div className="max-w-4xl mx-auto px-4 mt-[40px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {tags.map((tag, index) => (
            <>
              <Link
                key={index}
                className="w-full bg-secondary h-[150px] "
                href={`/tags/${tag}`}
              >
                <div className="flex flex-col items-center">
                  <h2 className="text-lg font-bold">{tag}</h2>
                  <p className="text-sm text-gray-300">
                    {tagCounts[tag]
                      ? `${tagCounts[tag]}+ Questions`
                      : "There is no questions..."}
                  </p>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
