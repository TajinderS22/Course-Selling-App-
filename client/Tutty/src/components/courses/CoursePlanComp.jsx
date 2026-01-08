import { ArrowDown, ArrowUp, Pencil } from "lucide-react";
import React, { useState } from "react";

const CoursePlanComp = ({ props, editing, chapters, setChapters }) => {
  const { number, chapterName, chapterDescription, key } = props;


  const [expanded, setExpanded] = useState(false);

  const [editingNow, setEditingNow] = useState(false);
  if (editing) {
    return (
      <div
        key={key}
        className={`w-11/12 mx-auto ${
          expanded &&
          "bg-stone-300/50 dark:bg-stone-700/50 py-2 ring-1 my-4 ring-stone-700 dark:ring-stone-300/50"
        }  m-1  rounded-md p-1 `}
      >
        <div className="flex items-center-safe w-[calc(100%-10px)] mx-auto bg-slate-300/50 dark:bg-slate-700 ring ring-stone-400  p-2 rounded-lg justify-between px-4  ">
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-4">{number}</div>
            <input
              value={chapters.find((x) => x.number == number).chapterName}
              onChange={(e) => {
                if (editingNow) {
                  setChapters((prevChapters) =>
                    prevChapters.map((chapter) =>
                      chapter.number === number
                        ? { ...chapter, chapterName: e.target.value }
                        : chapter
                    )
                  );
                }
              }}
              placeholder="Chapter name"
              className="font-sans p-1 rounde-md  border-0 focus:outline-0 font-semibold"
            />
          </div>
          <div>
            {expanded ? (
              <div className="flex items-center gap-2">
                <Pencil
                  className={`${
                    editingNow ? "bg-red-200 dark:bg-red-600/50  " : "bg-green-300 dark:bg-green-600/50"
                  } p-2  rounded-lg w-8 h-8 `}
                  onClick={() => {
                    setEditingNow(!editingNow);
                  }}
                />
                <ArrowUp
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                  className="bg-stone-300  ring ring-stone-400 dark:bg-stone-700 p-1 rounded-lg h-8 w-8 "
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Pencil
                  className={`${
                    editingNow ? "bg-red-200 dark:bg-red-600/50  " : "bg-green-300 dark:bg-green-600/50"
                  } p-2  rounded-lg w-8 h-8 `}
                  onClick={() => {
                    setEditingNow(!editingNow);
                  }}
                />
                <ArrowDown
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                  className="bg-stone-300 ring ring-stone-400 dark:bg-stone-700  p-1 rounded-lg h-8 w-8 "
                />
              </div>
            )}
          </div>
        </div>

        {/* expanded description  */}
        {expanded && (
          <div className="w-[calc(100%-10px)] mx-auto p-2 px-6 rounded-lg bg-slate-300/50 dark:bg-slate-700/90 ring ring-stone-400  flex gap-2  mt-1  ">
            <p className="text-md font-bold w-fit   ">Description</p>
            <input
              value={
                chapters.find((x) => x.number === number).chapterDescription
              }
              onChange={(e) => {
                if (editingNow) {
                  setChapters((prevChapters) =>
                    prevChapters.map((chapter) =>
                      chapter.number === number
                        ? { ...chapter, chapterDescription: e.target.value }
                        : chapter
                    )
                  );
                }
              }}
              placeholder="Chapter description"
              className="w-11/12 mx-auto border-0 focus:outline-none 2 "
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      key={key}
      className={`w-11/12 mx-auto ${
        expanded &&
        "bg-stone-300/50 dark:bg-stone-700/50 py-2 ring-1 my-4 ring-stone-700 dark:ring-stone-300/50"
      }  m-1  rounded-md p-1 `}
    >
      <div
        onClick={() => {
          setExpanded(!expanded);
        }}
        className="flex items-center-safe w-[calc(100%-10px)] mx-auto bg-slate-300/50 dark:bg-slate-700 ring ring-stone-400  p-2 rounded-lg justify-between px-4  "
      >
        <div className="flex items-center  gap-6">
          <p className="font-bold text-xl">{number}</p>
          <p className="font-serif font-semibold">{chapterName}</p>
        </div>
        <div
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? (
            <ArrowUp className="bg-stone-300  ring ring-stone-400 dark:bg-stone-700 p-1 rounded-lg h-8 w-8 " />
          ) : (
            <ArrowDown className="bg-stone-300 ring ring-stone-400 dark:bg-stone-700  p-1 rounded-lg h-8 w-8 " />
          )}
        </div>
      </div>

      {/* expanded description  */}
      {expanded && (
        <div className="w-[calc(100%-10px)] mx-auto p-2 px-6 rounded-lg bg-slate-300/50 dark:bg-slate-800/60 ring ring-stone-400  flex gap-2  mt-1  ">
          <p className="text-md font-bold w-fit  ">Description </p>
          <div className=" w-11/12 mx-auto">{chapterDescription}</div>
        </div>
      )}
    </div>
  );
};

export default CoursePlanComp;
