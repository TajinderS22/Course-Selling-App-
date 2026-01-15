import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import useActiveSession from "../../hooks/useActiveSession";
import useActiveSessionCreator from "../../hooks/useActiveSessionCreator";

const SettingsPage = () => {
  // const {loading,jwt} = useActiveSession();
  const {jwt} = useActiveSession
  const {jwtCreator} = useActiveSessionCreator()

  const user = useSelector((state) => state.user);
  const creator = useSelector((state) => state.creator);
  const navigate=useNavigate()
  if (!user && !creator) {
    navigate("/");
  }

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
  );

  const [imageFile, setImageFile] = useState(null);
  const [loadingOnPage, setLoadingOnPage] = useState(false);
  const [address, setAddress] = useState();

  const handleImageUpload = async () => {

    setLoadingOnPage(true);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        let res;
        if (user) {
          res = await axios.post(
            SERVER_ADDRESS + "/user/image/upload",
            {
              image: base64Image,
            },
            {
              headers: {
                authorization: jwt,
              },
            }
          );
        } else {
          res = await axios.post(
            SERVER_ADDRESS + "/creator/image/upload",
            {
              image: base64Image,
            },
            {
              headers: {
                authorization: jwtCreator,
              },
            }
          );
        }
        setProfileImage(res.data);
        setLoadingOnPage(false);
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleUserUpdateClick = async () => {
    setLoadingOnPage(true);
    try {
      let res;
      if(user){
        res = await axios.post(
          SERVER_ADDRESS + "/user/update/profile",
          {
            firstname,
            lastname,
            email,
            phone,
            profileImage,
            address,
          },
          {
            headers: {
              authorization: jwt,
            },
          }
        );
      }else{
        res = await axios.post(
          SERVER_ADDRESS + "/creator/update/profile",
          {
            firstname,
            lastname,
            email,
            phone,
            profileImage,
            address,
          },
          {
            headers: {
              authorization: jwtCreator,
            },
          }
        );
      }
      if (res.status == 200) {
        setLoadingOnPage(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user?.email);
      if (user.phoneNumber) setPhone(user.phoneNumber);
      if (user.profileImageUrl) setProfileImage(user.profileImageUrl);
      if (user.address) setAddress(user.address);
    } else if (creator) {
      setFirstname(creator.firstname);
      setLastname(creator.lastname);
      setEmail(creator?.email);
      if (creator.phoneNumber) setPhone(creator.phoneNumber);
      if (creator.profileImageUrl) setProfileImage(creator.profileImageUrl);
      if (creator.address) setAddress(creator.address);
    }
  }, [user, creator]);

  // if (loading) {
  //   return (
  //     <div className="min-h-[90svh] absolute">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-[90svh] dark:bg-slate-800 dark:text-white ">
      <Navbar />
      {loadingOnPage && (
        <div className="w-full h-full backdrop-blur-md absolute bg-black/30 ">
          <Loading />
        </div>
      )}
      <div className="  mx-auto">
        <div className="w-10/12 mx-auto my-4 font-bold text-4xl ">
          Update your Profile
        </div>
        <div className=" border h-full xl:w-10/12 mx-auto px-6 py-4 clear-start">
          {/* form here  */}

          <div className="flex not-md:flex-col bg-slate-200/30 rounded-md dark:bg-slate-100/10 m-2 xl:w-10/12 md:w-11/12  mx-auto md:justify-between ">
            <div className="flex  m-1 items-center not-md:flex-col  ">
              <p className="mx-2 font-semibold p-2 w-20 " htmlFor="firstname">
                Firstname
              </p>
              <input
                className="bg-slate-400 m-2 rounded-md p-2 dark:bg-slate-600 "
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="flex m-1 items-center not-md:flex-col  ">
              <p className="mx-2 font-semibold p-2 w-20 " htmlFor="lastname">
                Lastname
              </p>
              <input
                className="bg-slate-400 m-2 rounded-md p-2 dark:bg-slate-600 "
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="flex not-md:flex-col xl:w-10/12 md:w-11/12 mx-auto bg-slate-200/30 rounded-md dark:bg-slate-100/10 m-2 md:justify-between">
            <div className="flex m-1 items-center not-md:flex-col  ">
              <p className="mx-2 font-semibold p-2 w-20 " htmlFor="email">
                Email
              </p>
              <input
                className="bg-slate-400 m-2 rounded-md p-2 dark:bg-slate-600 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="flex m-1 items-center not-md:flex-col  ">
              <p className="mx-2 font-semibold p-2 w-20 " htmlFor="email">
                Phone
              </p>
              <input
                className="bg-slate-400 m-2 rounded-md p-2 dark:bg-slate-600 "
                value={phone}
                onChange={(e) => {
                  if (
                    e.target.value.length <= 10 &&
                    /^\d*$/.test(e.target.value)
                  ) {
                    setPhone(e.target.value);
                  }
                }}
                placeholder="phone"
              />
            </div>
          </div>

          <div className="xl:w-10/12 md:w-11/12 flex not-md:flex-col px-auto  bg-slate-200/30 rounded-md dark:bg-slate-100/10 m-2 pr-8 mx-auto ">
            <div className="flex-1  ">
              <p className="mx-2 text-lg font-semibold p-2 w-80">
                Profile Image
              </p>
              <div className="flex md:w-6/12 ml-6 px-auto  flex-col">
                <input
                  type="file"
                  accept="image/*"
                  name={"profileImage" + "_" + user?.email}
                  className="bg-slate-400/60 h-20 p-2 rounded-sm dark:bg-slate-600 dark:text-white"
                  onChange={async (e) => {
                    const imageFile = e.target.files[0];

                    setImageFile(imageFile);
                  }}
                />

                <button
                  onClick={handleImageUpload}
                  className="bg-neutral-500/80 dark:bg-neutral-400/50 md:w-8/12 m-2 p-2 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="md:w-[40%] w-[70%] mx-auto ">
              <img
                className="w-full  mx-auto  rounded-lg "
                src={profileImage}
                alt=""
              />
            </div>
          </div>

          <div className="xl:w-10/12 md:w-11/12 mx-auto bg-slate-200/30 rounded-md p-2  dark:bg-slate-100/10 m-2 ">
            <p className="text-lg font-semibold">Address</p>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white/50 rounded-md dark:bg-slate-900/30 p-2  w-full "
              rows="4"
            ></textarea>
          </div>

          <div className="">
            <div className="w-10/12 flex md:justify-end m-2 mx-auto">
              <button
                className="bg-slate-400 dark:bg-slate-400/50 m-2 p-2 rounded-md"
                onClick={handleUserUpdateClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
