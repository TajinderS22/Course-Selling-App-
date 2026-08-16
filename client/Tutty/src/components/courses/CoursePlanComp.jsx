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
        className={`mx-auto my-1 w-11/12 rounded-md p-1 ${
          expanded && "border border-border bg-app py-2"
        }`}
      >
        <div className="mx-auto flex w-[calc(100%-10px)] items-center justify-between rounded-md border border-border bg-app px-4 py-2.5">
          <div className="flex items-center gap-4">
            <div className="font-display text-xl font-bold text-primary">
              {number}
            </div>
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
              className="border-0 bg-transparent font-sans font-semibold focus:outline-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                editingNow ? "bg-primary-soft text-primary" : "bg-secondary-soft text-secondary"
              }`}
              onClick={() => {
                setEditingNow(!editingNow);
              }}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setExpanded(!expanded);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-ink"
            >
              {expanded ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* expanded description */}
        {expanded && (
          <div className="mx-auto mt-1 flex w-[calc(100%-10px)] gap-2 rounded-md border border-border bg-app px-6 py-3">
            <p className="w-fit font-bold">Description</p>
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
              className="mx-auto w-11/12 border-0 focus:outline-none"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      key={key}
      className={`mx-auto my-1 w-11/12 rounded-md p-1 ${
        expanded && "border border-border bg-app py-2"
      }`}
    >
      <div
        onClick={() => {
          setExpanded(!expanded);
        }}
        className="mx-auto flex w-[calc(100%-10px)] cursor-pointer items-center justify-between rounded-md border border-border bg-app px-4 py-2.5 transition hover:bg-surface"
      >
        <div className="flex items-center gap-5">
          <p className="font-display text-xl font-bold text-primary">
            {number}
          </p>
          <p className="font-semibold">{chapterName}</p>
        </div>
        <button
          onClick={() => {
            setExpanded(!expanded);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-ink"
        >
          {expanded ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* expanded description */}
      {expanded && (
        <div className="mx-auto mt-1 flex w-[calc(100%-10px)] gap-2 rounded-md border border-border bg-app px-6 py-3">
          <p className="w-fit font-bold">Description</p>
          <div className="mx-auto w-11/12 text-ink-soft">{chapterDescription}</div>
        </div>
      )}
    </div>
  );
};

export default CoursePlanComp;
