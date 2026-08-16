import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import useActiveSession from "../../hooks/useActiveSession";
import useActiveSessionCreator from "../../hooks/useActiveSessionCreator";
import { Upload } from "lucide-react";

const SettingsPage = () => {
  const { jwt } = useActiveSession();
  const { jwtCreator } = useActiveSessionCreator();

  const user = useSelector((state) => state.user);
  const creator = useSelector((state) => state.creator);
  const navigate = useNavigate();
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
      if (user) {
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
      } else {
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

  return (
    <div className="min-h-[100svh] bg-app text-ink">
      <Navbar />
      {loadingOnPage && (
        <div className="absolute h-full w-full bg-ink/30 backdrop-blur-md">
          <Loading />
        </div>
      )}
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-28">
        <div className="font-display my-4 text-3xl font-bold md:text-4xl">
          Update your Profile
        </div>

        {/* form here */}
        <div className="card grid gap-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              First name
              <input
                className="input-base mt-1"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label className="text-sm font-semibold">
              Last name
              <input
                className="input-base mt-1"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
            <label className="text-sm font-semibold">
              Email
              <input
                className="input-base mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </label>
            <label className="text-sm font-semibold">
              Phone
              <input
                className="input-base mt-1"
                value={phone}
                onChange={(e) => {
                  if (
                    e.target.value.length <= 10 &&
                    /^\d*$/.test(e.target.value)
                  ) {
                    setPhone(e.target.value);
                  }
                }}
                placeholder="Phone"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Profile image</p>
              <div className="mt-1 flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  name={"profileImage" + "_" + (user?.email || creator?.email)}
                  className="input-base"
                  onChange={async (e) => {
                    const imageFile = e.target.files[0];
                    setImageFile(imageFile);
                  }}
                />
                <button
                  onClick={handleImageUpload}
                  className="btn btn-secondary w-fit"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
              </div>
            </div>
            <div>
              <img
                className="h-40 w-full rounded-md border border-border object-cover"
                src={profileImage}
                alt=""
              />
            </div>
          </div>

          <label className="text-sm font-semibold">
            Address
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-base mt-1 w-full"
              rows="4"
            ></textarea>
          </label>

          <div className="flex justify-end">
            <button className="btn btn-primary px-8" onClick={handleUserUpdateClick}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
