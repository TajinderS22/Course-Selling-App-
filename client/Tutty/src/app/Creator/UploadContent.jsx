/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import axios from "axios";
import useActiveSessionCreator from "../../hooks/useActiveSessionCreator";
import { Upload } from "lucide-react";

import Loading from "../../components/Loading";
import LectureContent from "../../components/Learning/LectureContent";

const UploadContent = () => {
  const pathname = useLocation().pathname;
  const [info, setInfo] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [url, setUrl] = useState(null);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isUploaded, setIsUploaded] = useState(0);

  const [currentContent, setCurrentContent] = useState(null);

  const AvailableTypes = ["video", "text", "pdf", "image"];

  const courseId = pathname.split("/").at(-2);
  const getCourseInfoCreator = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + `/course/info/${courseId}`
      );
      setInfo(response.data.info);
      if (selectedChapter) {
        const chapter = response.data.info.chapters.find(
          (x) => x.number == selectedChapter.number
        );
        setSelectedChapter(chapter);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { jwtCreator } = useActiveSessionCreator();

  const uploadFile = async () => {
    if (!file) {
      alert("Please Select a file");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("courseId", courseId);
      formData.append("chapterNumber", selectedChapter.number);
      formData.append("type", type);

      await axios.post(SERVER_ADDRESS + "/course/s3/upload", formData, {
        headers: {
          authorization: jwtCreator,
        },
      });
      setType("");

      setIsUploaded(isUploaded + 1);

      alert(" Uploaded successfully");
      setFile(null);
    } catch (err) {
      console.error(" Upload failed", err);
    }
  };

  const getPreviewUrl = async () => {
    if (!currentContent?.content) return;
    setUrl(null);
    const url = await axios.post(
      SERVER_ADDRESS + "/course/s3/creator/get-url",
      {
        fileKey: currentContent?.content,
      },
      {
        headers: {
          authorization: jwtCreator,
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

  useEffect(() => {
    setIsMediaLoaded(false);
    if (currentContent && currentContent.type != "text" && currentContent.content) {
      getPreviewUrl();
    }
  }, [isUploaded]);

  const getContent = async () => {
    if (selectedChapter) {
      try {
        const res = await axios.post(
          SERVER_ADDRESS + "/course/creator/chapter/content",
          {
            contentId: selectedChapter?.content[0],
          },
          {
            headers: {
              authorization: jwtCreator,
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
    getContent();
  }, [selectedChapter]);

  useEffect(() => {
    getContent();
  }, [isUploaded]);

  useEffect(() => {
    getCourseInfoCreator();
  }, [isUploaded]);

  const uploadTextContent = async () => {
    setType("");

    try {
      let res;
      if (currentContent?.type == "text" && currentContent.content != "") {
        res = await axios.put(
          SERVER_ADDRESS + "/course/creator/content/text/update",
          {
            courseId: courseId,
            chapterNumber: selectedChapter.number,
            content: content,
            type: "text",
            contentId: currentContent._id,
          },
          {
            headers: {
              authorization: jwtCreator,
            },
          }
        );
      } else {
        res = await axios.post(
          SERVER_ADDRESS + "/course/creator/content/text/upload",
          {
            courseId: courseId,
            chapterNumber: selectedChapter.number,
            type: "text",
            content: content,
          },
          {
            headers: {
              authorization: jwtCreator,
            },
          }
        );
      }

      setContent("");
      setIsUploaded(isUploaded + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[100svh] bg-app text-ink">
      <Navbar />
      <div className="mx-auto w-11/12 max-w-5xl pb-16 pt-28">
        <div className="font-display card w-fit px-6 py-3 text-2xl font-bold">
          {info?.title}
        </div>

        <div className="card mt-6 p-5">
          <p className="text-lg font-medium">Please select a chapter to add content</p>

          <div className="mt-4">
            <select
              className="input-base w-full cursor-pointer md:w-[60%]"
              value={selectedChapter?.number || ""}
              onChange={(e) => {
                const chapter = info.chapters.find(
                  (ch) => ch.number === Number(e.target.value)
                );
                setCurrentContent(null);
                setSelectedChapter(chapter);
              }}
            >
              <option value="" disabled>
                Select Chapter
              </option>

              {info?.chapters.map((chapter) => (
                <option
                  key={chapter.number}
                  value={chapter.number}
                  className="bg-surface text-ink"
                >
                  {chapter.chapterName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedChapter && (
          <div>
            <div className="card mt-4 p-5">
              <p className="font-display text-xl font-semibold">Selected chapter</p>

              <div className="mt-3 flex flex-wrap gap-4">
                <div className="flex gap-2 rounded-md bg-app px-3 py-2">
                  <span className="text-ink-soft">Number</span>
                  <span className="font-semibold">{selectedChapter.number}</span>
                </div>
                <div className="flex gap-2 rounded-md bg-app px-3 py-2">
                  <span className="text-ink-soft">Name</span>
                  <span className="font-semibold">{selectedChapter.chapterName}</span>
                </div>
              </div>
            </div>

            {/* content and all */}
            <div className="card mt-4 p-5">
              <div className="flex items-center gap-4">
                <p className="font-display text-lg font-semibold">Type</p>
                <select
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  className="input-base w-fit cursor-pointer"
                  value={type || ""}
                  id=""
                >
                  <option value="" disabled>
                    Select Type
                  </option>

                  {AvailableTypes.map((type, index) => {
                    return (
                      <option key={index} className="bg-surface text-ink" value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              </div>
              {type != "text" && type != "" && (
                <div className="mt-4 flex flex-col">
                  <input
                    className="input-base w-full max-w-md"
                    type="file"
                    accept="image/*,application/pdf,video/mp4,video/webm"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    className="btn btn-primary mt-4 w-fit min-w-60"
                    onClick={uploadFile}
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </button>
                </div>
              )}

              {type == "text" && (
                <div className="mt-4 rounded-md border border-secondary/40 bg-secondary-soft p-4">
                  <p className="text-sm">Please enter the content</p>
                  <textarea
                    className="input-base mt-2 w-full"
                    rows={4}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>

                  <div className="mt-3">
                    <button
                      className="btn btn-primary px-6"
                      onClick={() => {
                        uploadTextContent();
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* this shows the content present already */}
        <div className="mx-auto min-h-[60svh] w-full">
          {currentContent?.type != "text" && !url && (
            <div className="min-h-svh">
              <Loading />
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

export default UploadContent;
