/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { AppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator, setCreator } from "../../store/slices/creatorSlice";
import CoursePlan from "../../components/courses/CoursePlan";
import useActiveSessionCreator from "../../hooks/useActiveSessionCreator";
import { Upload } from "lucide-react";

const EditCourse = () => {
  const user = useSelector((state) => state.creator);

  const navigate = useNavigate();
  const { setIsCreator } = useContext(AppContext);

  const { jwtCreator } = useActiveSessionCreator();

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
        authorization: jwtCreator,
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
            authorization: jwtCreator,
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
    if (!user && jwtCreator) {
      ifSessionActive();
    } else if (!jwtCreator) {
      navigate("/creator/authentication");
    }
  }, [user, jwtCreator]);

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
              authorization: jwtCreator,
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
    <div className="min-h-svh bg-app text-ink">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-28">
        <div className="font-display text-3xl font-bold md:text-4xl">
          Hi {user?.firstname + " " + user?.lastname}
        </div>
        <div className="mt-2 text-lg text-primary">
          Update the details of your course
        </div>

        {/* input form */}
        <div className="flex flex-col items-center">
          <div className="card mt-8 grid w-full gap-6 p-6 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-semibold">
                Title
                <input
                  required
                  ref={titleRef}
                  type="text"
                  name="title"
                  placeholder="Course title"
                  className="input-base mt-1"
                />
              </label>
              <label className="text-sm font-semibold">
                Description
                <input
                  required
                  ref={descriptionRef}
                  type="text"
                  name="description"
                  placeholder="Course description"
                  className="input-base mt-1"
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-semibold">
                Price (₹)
                <input
                  required
                  ref={priceRef}
                  type="text"
                  name="price"
                  placeholder="499"
                  className="input-base mt-1"
                />
              </label>
              <div className="text-sm font-semibold">
                Image
                <div className="mt-1 rounded-md border border-border bg-app p-3">
                  <input
                    required
                    type="file"
                    accept="image/*"
                    name="img"
                    className="input-base"
                    onChange={async (e) => {
                      const imageFile = e.target.files[0];
                      imageRef.current = imageFile;
                      setImage(imageFile);
                    }}
                  />
                  {imageUploaded ? (
                    <div className="mt-2">
                      <img
                        src={file}
                        alt="Thumbnail uploaded by creator"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-ink-soft">
                      {isImageUploading ? "Uploading..." : "Keep existing image or upload new"}
                    </div>
                  )}
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => {
                        setisImageUploading(true);
                        if (image) {
                          handleImagUpload();
                        } else {
                          alert("Please upload the image");
                        }
                      }}
                      className="btn btn-secondary"
                    >
                      <Upload className="h-4 w-4" />
                      {file ? "Change" : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full rounded-md border border-secondary/40 bg-secondary-soft p-5">
            <p className="font-display w-fit rounded-md bg-surface px-3 py-2 text-xl font-bold shadow-soft">
              Edit lecture plan here
            </p>
            <div className="mt-3">
              {chapters && (
                <CoursePlan
                  editing={true}
                  setChapters={setChapters}
                  info={info}
                  chapters={chapters}
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex w-full justify-end">
            <button
              className="btn btn-primary px-10"
              onClick={() => {
                editCourseSubmit();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
