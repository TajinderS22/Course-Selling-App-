import { Minus, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import CoursePlanComp from "./CoursePlanComp";

const CoursePlan = ({ chapters, setChapters, editing }) => {
  const chapterNameRef = useRef();
  const chapterDescriptionRef = useRef();
  const chapterNumberRef = useRef(chapters.length + 1);

  const [createNew, setCreateNew] = useState(false);

  return (
    <div>
      {chapters.length > 0 && (
        <div className="space-y-1">
          {chapters?.map((x) => {
            return (
              <CoursePlanComp
                key={x.number}
                editing={editing}
                chapters={chapters}
                setChapters={setChapters}
                props={x}
              />
            );
          })}
        </div>
      )}

      <div
        className="mt-2 w-fit cursor-pointer"
        onClick={() => {
          setCreateNew(!createNew);
        }}
      >
        {createNew ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-ink shadow-soft">
            <Minus className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-primary shadow-soft">
            <Plus className="h-5 w-5" />
          </div>
        )}
      </div>

      {createNew && (
        <div className="mt-3 w-full rounded-md border border-secondary/40 bg-secondary-soft p-4 md:w-6/12">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-ink">
              Chapter Name
              <input
                className="input-base mt-1"
                placeholder="Chapter Name"
                ref={chapterNameRef}
                type="text"
              />
            </label>
            <label className="text-sm font-semibold text-ink">
              Description
              <input
                className="input-base mt-1"
                placeholder="Description"
                ref={chapterDescriptionRef}
                type="text"
              />
            </label>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                const chapter = {
                  number: chapterNumberRef.current,
                  chapterName: chapterNameRef.current.value,
                  chapterDescription: chapterDescriptionRef.current.value,
                };
                setChapters([...chapters, chapter]);
                chapterNumberRef.current++;
                if (chapterNameRef.current) chapterNameRef.current.value = "";
                if (chapterDescriptionRef.current)
                  chapterDescriptionRef.current.value = "";
                setCreateNew(false);
              }}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlan;
