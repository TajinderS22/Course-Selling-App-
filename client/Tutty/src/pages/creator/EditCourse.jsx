/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
// import { useRecoilState } from "recoil";
// import { CreatorAtom } from "../../recoil/creatorAtom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { AppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator, setCreator } from "../../store/slices/creatorSlice";
import CoursePlan from "../../components/courses/CoursePlan";

const EditCourse = () => {
  const user = useSelector((state) => state.creator);

  const navigate = useNavigate();
  const { setIsCreator } = useContext(AppContext);

  const jwt = localStorage.getItem("jwtCreator");


  const dispatch = useDispatch();

  const [info, setInfo] = useState([]);

  const [image, setImage] = useState(null);
  const [file, setfile] = useState();
  const [isImageUploading, setisImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const imageRef = useRef();

  const [chapters, setChapters] = useState([]);
  const pathname = useLocation().pathname;
  const courseId = pathname.split("/").at(-1);

  const getCourseInfo = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + `/course/info/${courseId}`
      );
      setInfo(response.data.info);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    if (titleRef?.current) titleRef.current.value = info.title;
    if (descriptionRef?.current)
      descriptionRef.current.value = info.description;
    if (priceRef?.current) priceRef.current.value = info.price;

    setImageUrl(info.imageUrl);
    setChapters(info.chapters);
  }, [info]);

  const editCourseSubmit = async () => {
    const title = titleRef?.current?.value;
    const description = descriptionRef?.current?.value;
    const price = priceRef?.current?.value;

    const data = {
      courseId,
      title,
      description,
      price,
      imageUrl,
      chapters,
    };
    const response = await axios.put(SERVER_ADDRESS + "/creator/course", data, {
      headers: {
        authorization: jwt,
      },
    });
    if (response.status == 200) {
      alert(response?.data?.message);
      navigate("/creator/dashboard");
    } else {
      alert(response?.data?.message);
    }
  };

  const ifSessionActive = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/creator/verify",
        {},
        {
          headers: {
            authorization: jwt,
          },
        }
      );
      const user = response?.data?.user;

      if (response.status === 200) {
        dispatch(setCreator(user));
        setIsCreator(true);
      } else {
        dispatch(clearCreator());
        navigate("/creator/authentication");
      }
    } catch (err) {
      console.error("Session check failed:", err);
      dispatch(clearCreator());
      navigate("/creator/authentication");
    }
  };

  useEffect(() => {
    if (!user && jwt) {
      ifSessionActive();
    } else if (!jwt) {
      navigate("/creator/authentication");
    }
  }, [user, jwt]);

  const handleImagUpload = async () => {
    if (!imageRef.current) return alert("Please select an image");

    const reader = new FileReader();
    const image = imageRef.current;

    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setfile(base64Image);
      try {
        const response = await axios.post(
          SERVER_ADDRESS + "/course/image/upload",
          { image: base64Image },
          {
            headers: {
              authorization: jwt,
            },
          }
        );

        if (response.status === 200) {
          setImageUploaded(true);
          setImageUrl(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    reader.onerror = () => {
      alert("Failed to read file");
    };
  };
  if (!user) return null;

  return (
    <div className="dark:bg-[#1D293D] dark:text-white">
      <Navbar />
      <div className="h-fit min-h-[96svh] dark:bg-[#1D293D] dark:text-white bg-[#ADEED9]/40 pb-6 ">
        <div className=" max-w-[1080px]  mx-auto p-4 pt-12  ">
          <div className="text-4xl font-semibold">
            Hi {user?.firstname + " " + user?.lastname}
          </div>
          <div className="text-xl mt-4 text-amber-700">
            Please fill all the details of your course
          </div>
          {/* input   form  */}
          <div className="  ">
            <div className="flex  flex-col items-center">
              <div className="flex bg-stone-200 dark:bg-stone-700/70 w-10/12 rounded-lg my-10 py-2 not-md:flex-col justify-center mx-auto ">
                <div className="flex flex-col mx-2">
                  <div className="min-w-[300px] flex justify-between flex-col md:block ">
                    <label htmlFor="title">Title : </label>
                    <input
                      required
                      ref={titleRef}
                      type="text"
                      name="title"
                      placeholder="title"
                      className="bg-stone-400/50 p-2 m-2 md:w-[80%] rounded-lg"
                    />
                  </div>
                  <div className="min-w-[300px] flex justify-between  flex-col md:block ">
                    <label htmlFor="description">Discription : </label>
                    <input
                      required
                      ref={descriptionRef}
                      type="text"
                      name="description"
                      placeholder="description"
                      className="bg-stone-400/50 p-2 m-2  md:w-[66%] rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col mx-2">
                  <div className="min-w-[300px] flex justify-between flex-col md:block ">
                    <label htmlFor="price">Price : </label>
                    <input
                      required
                      ref={priceRef}
                      type="text"
                      name="price"
                      placeholder="price"
                      className="bg-stone-400/50 p-2 m-2 md:w-[78%]  rounded-lg"
                    />
                  </div>
                  <div className="min-w-[300px] max-w-[500px] flex not-md:flex-col ">
                    <p className="top-" htmlFor="img">
                      Image :{" "}
                    </p>
                    <div
                      className={`bg-stone-400/50  h-fit m-2 md:w-[75%] p-[4px] not-md:w-[95%]  rounded-lg`}
                    >
                      <input
                        required
                        type="file"
                        accept="image/*"
                        name="img"
                        className={`bg-stone-400/80  ${
                          file ? "h-[30%]" : "h-[70%]"
                        } p-3 rounded-lg w-full  `}
                        onChange={async (e) => {
                          const imageFile = e.target.files[0];
                          imageRef.current = imageFile;
                          setImage(imageFile);
                        }}
                      />
                      {imageUploaded ? (
                        <div className="p-2">
                          <img
                            src={file}
                            alt="Thumbnail uploaded by creator"
                            className="rounded-sm"
                          />
                        </div>
                      ) : (
                        <div className="p-2">
                          {isImageUploading ? "Uploading..." : null}
                        </div>
                      )}
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setisImageUploading(true);
                            if (image) {
                              handleImagUpload();
                            } else {
                              alert("Please upload the image");
                            }
                          }}
                          className="ring-1 hover:shadow-sm md:bg-transparent bg-gray-300 shadow-amber-400 ring-stone-800 rounded-lg p-1 my-1 mr-4  w-28 "
                        >
                          {file ? "Change" : "Upload"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  " bg-amber-100 dark:bg-amber-100/10 p-2 rounded-lg w-10/12"
                }
              >
                <p
                  className={` text-2xl p-2 shadow-lg w-fit bg-stone-400/40 rounded-lg font-serif 
                  font-stretch-125% font-bold mb-4 `}
                >
                  Edit lecture plan here
                </p>
                {chapters && (
                  <CoursePlan
                    editing={true}
                    setChapters={setChapters}
                    info={info}
                    chapters={chapters}
                  />
                )}
              </div>
              <div className=" w-10/12 flex p-2 mt-2 justify-end mx-auto">
                <button
                  className="bg-blue-400/60 p-3 rounded-lg "
                  onClick={() => {
                    editCourseSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
