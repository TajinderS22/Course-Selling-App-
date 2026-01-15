/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import axios from "axios";
import useActiveSessionCreator from "../../hooks/useActiveSessionCreator";

import Loading from "../../components/Loading";

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
        setSelectedChapter(chapter)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { jwtCreator } = useActiveSessionCreator();

  const uploadFile = async () => {
    
    if(!file){
      alert("Please Select a file")
      return null
    }
    try {
      const res = await axios.post(
        SERVER_ADDRESS + "/course/s3/upload-url",
        {
          fileName: file.name,
          fileType: file.type,
          courseId: courseId,
          chapterNumber: selectedChapter.number,
          type: type,
        },
        {
          headers: {
            authorization: jwtCreator,
          },
        }
      );
      setType("");

      const { uploadUrl, fileKey } = res.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setIsUploaded(isUploaded + 1);
      
      alert(" Uploaded successfully");
      setFile(null)
    } catch (err) {
      console.error(" Upload failed", err);
    }
  };

  const getPreviewUrl = async () => {
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
    if (currentContent?.type != "text") {
      getPreviewUrl();
    }
  }, [currentContent]);

  useEffect(() => {
    setIsMediaLoaded(false);
    if (currentContent?.type != "text") {
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





  const uploadTextContent=async()=>{

    setType("");
    
    try {
      let res;
      if(currentContent?.type=="text"&& currentContent.content!=''){
        res = await axios.put(
          SERVER_ADDRESS + "/course/creator/content/text/update",{
            courseId:courseId,
            chapterNumber:selectedChapter.number,
            content:content,
            type:"text",
            contentId:currentContent._id
          },
          {
            headers: {
              authorization: jwtCreator,
            }
          }
        );
      }else{
        res = await axios.post(
          SERVER_ADDRESS + "/course/creator/content/text/upload",{
            courseId:courseId,
            chapterNumber:selectedChapter.number,
            type:"text",
            content:content
          },
          {
            headers: {
              authorization: jwtCreator,
            }
          }
        );
      }

      setContent("");
      setIsUploaded(isUploaded+1)
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-[90svh] dark:bg-slate-800 dark:text-white">
      <Navbar />
      <div className="w-10/12 mx-auto">
        <div className="text-4xl bg-slate-400/40 p-2 px-4 rounded-md w-fit ml-0 font-semibold m-2">
          {info?.title}
        </div>

        <div className="p-2 bg-slate-400/30 rounded-md">
          <p className="text-xl font-medium">
            Please Select Chapter to add content
          </p>

          <div className="my-4">
            <select
              className="bg-indigo-300/40 dark:bg-indigo-700/40 p-4 rounded-xl w-[60%]"
              value={selectedChapter?.number || ""}
              onChange={(e) => {
                const chapter = info.chapters.find(
                  (ch) => ch.number === Number(e.target.value)
                );
                setCurrentContent(null)
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
                  className="bg-indigo-300/30  dark:bg-indig-700"
                >
                  {chapter.chapterName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedChapter && (
          <div>
            <div className="mt-4 bg-slate-400/30 p-2 rounded-md my-2 ">
              <p className="text-2xl">Selecetd chapter</p>

              <div className="flex gap-8 w-fit p-1 rounded-md ">
                <div className="flex bg-slate-200/60 dark:bg-slate-200/10 p-2 rounded-md gap-2">
                  <p>Number</p>
                  <p>{selectedChapter.number}</p>
                </div>

                <div className="flex bg-slate-200/60 dark:bg-slate-200/10 p-2 rounded-md gap-2">
                  <p>Name</p>
                  <p>{selectedChapter.chapterName}</p>
                </div>
              </div>
            </div>

            {/* content and all */}

            <div className="bg-slate-400/30 p-2 rounded-md my-2  ">
              <div className=" flex items-center gap-4 ">
                <p className="text-xl font-semibold">Type</p>
                <select
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  className=" p-1 rounded-md bg-stone-400/40 dark:bg-stone-700/60"
                  value={type || ""}
                  id=""
                >
                  <option value="" disabled>
                    Select Type
                  </option>

                  {AvailableTypes.map((type, index) => {
                    return (
                      <option key={index} className="bg-stone-600/80" value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              </div>
              {type!="text" && type!="" && (
                <div className="flex flex-col">
                  <input
                    className="bg-amber-400/30 dark:bg-amber-600/40 w-80 h-20 mt-6 p-2 rounded-lg text-lg "
                    type="file"
                    accept="image/*,application/pdf,video/mp4,video/webm"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    className="p-2 rounded-full w-fit min-w-60 mt-4 bg-cyan-600/60"
                    onClick={uploadFile}
                  >
                    Upload
                  </button>
                </div>
              )}

              {type == "text" && (
                <div className="bg-fuchsia-100/20 p-2 rounded-md m-2 ">
                  <p className="text-md">please enter the content</p>
                  <textarea
                    className="bg-stone-200/40 mt-2 p-2 w-full "
                    rows={2}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>

                  <div>
                    <button className="bg-cyan-600/50 rounded-full p-2 px-6 w-fit" onClick={()=>{
                      uploadTextContent()
                    }}>
                      Upload
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* this show the content present already */}

        <div className="w-10/12 mx-auto min-h-[60svh]">
          {currentContent?.type != "text" && !url && (
            <div className="min-h-svh">
              <Loading />
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
        {/* This ends here */}
      </div>
    </div>
  );
};

export default UploadContent;
