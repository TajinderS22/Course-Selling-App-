import { Minus, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import CoursePlanComp from "./CoursePlanComp";

const CoursePlan = ({chapters,setChapters,editing,}) => {
  

  const chapterNameRef = useRef();
  const chapterDescriptionRef = useRef();
  const chapterNumberRef = useRef(chapters.length+1);

  const [createNew, setCreateNew] = useState(false);

  return (
    <div>
      {chapters.length > 0 && (
        <div>
          {chapters?.map((x) => {
            return (
              <CoursePlanComp key={x.number} editing={editing} chapters={chapters} setChapters={setChapters} props={x} />
            );
          })}
        </div>
      )}

      <div
        className="  p-2 w-24 rounded "
        onClick={() => {
          setCreateNew(!createNew);
        }}
      >
        {createNew ? (
          <Minus className="shadow=xl dark:bg-stone-700 bg-stone-300 h-10 rounded-lg shadow-lg w-10 " />
        ) : (
          <Plus className="shadow=xl dark:bg-stone-700 bg-stone-300 h-10 rounded-lg shadow-lg w-10 " />
        )}
      </div>

      {createNew && (
        <div className=" w-6/12 bg-green-100 dark:bg-green-900 rounded-lg">
          <div className="flex  w-full justify-between items-center p-2 gap-2">
            <p className="font-medium font-mono ">Chapter Name:</p>
            <input
              className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 "
              placeholder="Chapter Name"
              ref={chapterNameRef}
              type="text"
            />
          </div>
          <div className="flex w-full justify-between items-center p-2  gap-2">
            <p className="font-medium font-mono ">Description:</p>
            <input
              className="bg-slate-300 dark:bg-slate-700 rounded-lg p-2 "
              placeholder="Description"
              ref={chapterDescriptionRef}
              type="text"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="p-2 bg-emerald-300 dark:bg-cyan-900 ring-emerald-100/50 ring m-2 rounded-md"
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
              create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlan;
