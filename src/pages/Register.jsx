import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  document.title = "Mandi | Register"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {name, email, password}

    localStorage.setItem("user", JSON.stringify(user))

    alert("Registered Successfully")

    navigate("/")
  }

  return (
    <div className="flex flex-col  items-center justify-center h-screen">
      <div className="shadow-lg border p-6 w-80  rounded-lg">
        <h2 className="text-center font-bold text-2xl mb-4">Register </h2>

        <form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="border p-2 rounded-xl"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="border p-2 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="name"
            placeholder="Enter password"
            className="border p-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-6 bg-black text-white w-full p-2 text-center rounded-xl hover:bg-gray-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;