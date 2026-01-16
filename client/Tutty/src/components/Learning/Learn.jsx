/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import axios from "axios";
import useActiveSession from "../../hooks/useActiveSession";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../Navbar";
import Loading from "../Loading";
import useScrolled from "../../hooks/useScrolled";

const Learn = () => {
  const pathname = useLocation().pathname;
  const courseId = pathname.split("/").at(-1);

  const { jwt } = useActiveSession();

  const isScrolled = useScrolled(80);

  const [info, setInfo] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [url, setUrl] = useState(null);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [gotCoursesResFromServer,setGotCoursesResFromServer]= useState(false)



  const getCourseInfo = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/course/info/" + courseId
      );
      setInfo(response.data.info);
      setGotCoursesResFromServer(true)
    } catch (error) {
      console.error(error);
    }
  };

  const getPreviewUrl = async () => {
    setUrl(null);
    const url = await axios.post(
      SERVER_ADDRESS + "/course/s3/get-url",
      {
        fileKey: currentContent?.content,
      },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    setUrl(url.data.url);
  };

  useEffect(() => {
    setIsMediaLoaded(false);
    if (currentContent?.type != "text") {
      getPreviewUrl();
    }
  }, [currentContent]);

  const getContent = async () => {
    if (selectedChapter) {
      try {
        const res = await axios.post(
          SERVER_ADDRESS + "/course/chapter/content",
          {
            contentId: selectedChapter?.content[0],
          },
          {
            headers: {
              authorization: jwt,
            },
          }
        );
        setCurrentContent(res.data.content);
      } catch (error) {
        console.error(error);
      }
    } else return;
  };

  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    if (info) {
      setChapters(info?.chapters);
      
      setSelectedChapter(info?.chapters[0]);
    }
  }, [info]);

  useEffect(() => {
    getContent();
  }, [selectedChapter]);

  // if (!selectedChapter) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }


  if(!chapters){
    return (
      <div>
        {!gotCoursesResFromServer ? (
          <div className="w-full mx-auto h-svh">
            <Loading/>
          </div>
        ) : (
          <div className="flex min-h-[800px] items-center w-10/12 mx-auto ">
            <p>Stay Tuned Content coming soon</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-800">
      <Navbar />

      
      <div className="mx-12 my-4 flex gap-4 items-center  bg-stone-400/50 p-2 rounded-full w-fit px-6">
        <p className="text-lg font-bold ">{info?.title}</p>
        <ChevronRight />
      </div>
      <div
        className={` flex gap-6 ${
          !isScrolled ? "w-10/12 mx-auto " : "w-30 mx-12 "
        } justify-between dark:bg-cyan-50/40 bg-black/20 p-4 rounded sticky top-4
      ease-in-out duration-500 transform-3d
      `}
      >
        <ChevronLeft
          onClick={() => {
            const chapter = chapters.find(
              (x) => x.number == selectedChapter.number - 1
            );
            if (chapter) {
              setSelectedChapter(chapter);
            }
          }}
        />
        <p className={`${isScrolled && "hidden"}`}>
          {selectedChapter?.chapterName}
        </p>
        <ChevronRight
          onClick={() => {
            const chapter = chapters.find(
              (x) => x.number == selectedChapter.number + 1
            );

            if (chapter) {
              setSelectedChapter(chapter);
            }
          }}
        />
      </div>

      <div className="w-10/12 mx-auto min-h-[60svh]">
        {currentContent?.type != "text" && !url && (
          <div className="min-h-svh">
            <Loading />
          </div>
        )}

        {!currentContent && (
          <div
            className={`w-10/12 bg-slate-400/30 p-2 text-xl mx-auto rounded-md min-h-120 
            flex items-center justify-center font-bold text-indigo-800 dark:text-indigo-300 m-4`}
          >

            Stay Tuned Content coming soon

          </div>
        )}

        {currentContent?.type == "image" && (
          <div
            className={`w-10/12 bg-slate-400/30 p-2  mx-auto rounded-md  m-4`}
          >
            {!isMediaLoaded && <Loading />}
            <img
              src={url}
              alt=""
              onLoad={() => setIsMediaLoaded(true)}
              style={{ display: isMediaLoaded ? "block" : "none" }}
            />
          </div>
        )}
        {currentContent?.type == "text" && (
          <div
            className={`w-10/12 bg-slate-400/30 p-2  mx-auto rounded-md  m-4`}
          >
            <p>{currentContent?.content}</p>
          </div>
        )}

        {currentContent?.type == "pdf" && (
          <div
            className={`w-10/12 bg-slate-400/30 p-2  mx-auto rounded-md  m-4`}
          >
            {!isMediaLoaded && <Loading />}
            <iframe
              src={url}
              className="w-full h-[800px]"
              onLoad={() => setIsMediaLoaded(true)}
              style={{ display: isMediaLoaded ? "block" : "none" }}
            ></iframe>
          </div>
        )}

        {currentContent?.type == "video" && (
          <div
            className={`w-10/12 bg-slate-400/30 p-2  mx-auto rounded-md  m-4`}
          >
            {!isMediaLoaded && <Loading />}
            <video
              src={url}
              className="w-full"
              controls
              onLoadedData={() => setIsMediaLoaded(true)}
              style={{ display: isMediaLoaded ? "block" : "none" }}
            />
          </div>
        )}

        {currentContent?.type == "ppt" && (
          <div
            className={`w-10/12 bg-slate-400/30 p-2  mx-auto rounded-md  m-4`}
          >
            {!isMediaLoaded && <Loading />}

            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                url
              )}`}
              width="100%"
              height="600"
              onLoadedData={() => setIsMediaLoaded(true)}
              style={{ display: isMediaLoaded ? "block" : "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
