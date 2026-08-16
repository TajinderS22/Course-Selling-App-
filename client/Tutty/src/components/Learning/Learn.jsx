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
import LectureContent from "./LectureContent";

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
  const [gotCoursesResFromServer, setGotCoursesResFromServer] = useState(false);

  const getCourseInfo = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/course/info/" + courseId
      );
      setInfo(response.data.info);
      setGotCoursesResFromServer(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getPreviewUrl = async () => {
    if (!currentContent?.content) return;
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
    if (currentContent && currentContent.type != "text" && currentContent.content) {
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

  if (!chapters) {
    return (
      <div>
        {!gotCoursesResFromServer ? (
          <div className="mx-auto h-svh w-full">
            <Loading />
          </div>
        ) : (
          <div className="mx-auto flex min-h-[800px] w-10/12 items-center">
            <p className="text-lg text-ink-soft">Stay tuned, content coming soon</p>
          </div>
        )}
      </div>
    );
  }

  const chapterNav = (dir) => {
    const chapter = chapters.find(
      (x) => x.number == selectedChapter.number + dir
    );
    if (chapter) {
      setSelectedChapter(chapter);
    }
  };

  return (
    <div className="min-h-svh bg-app text-ink">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pt-28 md:px-8">
        <div className="card mx-auto mb-4 flex w-fit items-center gap-3 px-6 py-3">
          <p className="font-display text-lg font-bold">{info?.title}</p>
          <ChevronRight className="h-4 w-4 text-ink-soft" />
        </div>

        <div
          className={`card mx-auto mb-6 flex items-center justify-between px-4 py-3 ${
            isScrolled ? "sticky top-4 z-30 max-w-sm" : "w-full"
          } transition-all duration-500 ease-in-out`}
        >
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink transition hover:bg-surface-2"
            onClick={() => chapterNav(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p
            className={`font-display font-semibold ${
              isScrolled ? "hidden" : ""
            }`}
          >
            {selectedChapter?.chapterName}
          </p>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink transition hover:bg-surface-2"
            onClick={() => chapterNav(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto min-h-[60svh] w-full pb-16">
          {currentContent?.type != "text" && !url && (
            <div className="min-h-svh">
              <Loading />
            </div>
          )}

          {!currentContent && (
            <div className="card mx-auto flex min-h-32 w-full items-center justify-center border-l-4 border-l-primary p-4 text-xl font-bold text-primary">
              Stay tuned, content coming soon
            </div>
          )}

          {currentContent?.type == "image" && (
            <div className="card mx-auto w-full border-l-4 border-l-primary p-3">
              {!isMediaLoaded && <Loading />}
              <img
                src={url}
                alt=""
                className="rounded-md"
                onLoad={() => setIsMediaLoaded(true)}
                style={{ display: isMediaLoaded ? "block" : "none" }}
              />
            </div>
          )}
          {currentContent?.type == "text" && (
            <div className="card mx-auto w-full border-l-4 border-l-primary p-6 md:p-8">
              <LectureContent content={currentContent?.content} />
            </div>
          )}

          {currentContent?.type == "pdf" && (
            <div className="card mx-auto w-full border-l-4 border-l-primary p-3">
              {!isMediaLoaded && <Loading />}
              <iframe
                src={url}
                className="h-[800px] w-full rounded-md"
                onLoad={() => setIsMediaLoaded(true)}
                style={{ display: isMediaLoaded ? "block" : "none" }}
              ></iframe>
            </div>
          )}

          {currentContent?.type == "video" && (
            <div className="card mx-auto w-full border-l-4 border-l-primary p-3">
              {!isMediaLoaded && <Loading />}
              <video
                src={url}
                className="w-full rounded-md"
                controls
                onLoadedData={() => setIsMediaLoaded(true)}
                style={{ display: isMediaLoaded ? "block" : "none" }}
              />
            </div>
          )}

          {currentContent?.type == "ppt" && (
            <div className="card mx-auto w-full border-l-4 border-l-primary p-3">
              {!isMediaLoaded && <Loading />}
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  url
                )}`}
                width="100%"
                height="600"
                className="rounded-md"
                onLoadedData={() => setIsMediaLoaded(true)}
                style={{ display: isMediaLoaded ? "block" : "none" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;
