import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  document.title = "Mandi | Profile";

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(storedUser.name);
  const [email, setEmail] = useState(storedUser.email);
  const [password, setPassword] = useState(storedUser.password);

  const updateProfile = () => {
    const updatedUser = {
      ...storedUser,
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile Updated");
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <div className="flex justify-between items-center w-120 border px-4 py-2">
          <div className="border w-20 h-20 rounded-full flex items-center justify-center text-obsidian-900 font-display font-bold text-3xl shrink-0">
            {name?.[0]?.toUpperCase()}
          </div>
          <div className="">
            <h2 className="text-xl font-bold">{name}</h2>
            <h3 className="text-sm ">{email}</h3>
          </div>
        </div>

        <h2 className="font-medium text-2xl mb-4">Profile</h2>

        <div className="border p-8 flex flex-col justify-center items-center space-y-4 w-120">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg w-80 px-2 py-3"
            onChange={(e) => setName(e.target.name)}
          />

          <input
            type="text"
            placeholder="Email"
            className="border rounded-lg w-80 px-2 py-3"
            onChange={(e) => setName(e.target.name)}
          />

          <input
            type="text"
            placeholder="Password"
            className="border rounded-lg w-80 px-2 py-3"
            onChange={(e) => setName(e.target.name)}
          />

          <div>
            <button
              onClick={updateProfile}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
