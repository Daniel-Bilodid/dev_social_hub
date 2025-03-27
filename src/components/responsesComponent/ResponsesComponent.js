import React from "react";
import Image from "next/image";
import { formatDistance } from "date-fns";

const ResponsesComponent = ({ usersResponses }) => {
  return (
    <>
      {usersResponses.map((response, index) => (
        <div
          className="w-full bg-gray-800 p-7 px-9
mt-[20px] rounded-[20px]"
          key={index}
        >
          <div>
            {response.content.length > 0 ? (
              response.content.map((content, index) => (
                <div key={index}>
                  {content?.segments?.length > 0 ? (
                    content.segments.map((segment, segIndex) => {
                      const className = `
              ${segment.format?.bold ? "font-bold" : ""}
              ${segment.format?.underline ? "underline" : ""}
              ${segment.format?.italic ? "italic" : ""}
              ${segment.format?.strikethrough ? "line-through" : ""}
            `.trim();

                      return (
                        <span key={segIndex} className={className}>
                          {segment.text}
                        </span>
                      );
                    })
                  ) : (
                    <p>No segments available</p>
                  )}
                </div>
              ))
            ) : (
              <p>No content available</p>
            )}
          </div>

          <div className="text-white flex justify-between">
            <div className="flex">
              <div>
                {response.imageUrl && (
                  <Image
                    src={response.imageUrl}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt="User image"
                  />
                )}
              </div>
              {response?.username} - asked{" "}
              {response.createdAt
                ? formatDistance(response.createdAt.toDate(), new Date(), {
                    addSuffix: true,
                  })
                : "No Date"}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ResponsesComponent;
