import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../services/services";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      password,
    };
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      registerService(data)
        .catch((err) => {
          toast.error(err.response.data);
        })
        .then(async (res) => {
          if (res !== undefined) {
            toast.success("successfully register, now you can login!");
            navigate("/login");
          }
        });
    } else {
      toast.error("Please provide correct Information!");
    }
  };

  return (
    <div className="mb-auto flex mt-10 justify-center ">
      <div className="w-96 gap-6 flex flex-col items-center p-6 shadow-slate-400 shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-800"> Register </h1>
        <p> Create your free Acount Now!</p>
        <form
          method="POST"
          onSubmit={submit}
          className="flex gap-6 flex-col items-center w-80"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            className="border border-slate-300 p-2 rounded w-full"
            placeholder="Name"
            type="text"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 p-2 rounded w-full"
            placeholder="Email"
            type="text"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300 p-2 rounded w-full"
            placeholder="Password"
            type="password"
          />
          <button
            type="submit"
            className="bg-blue-800 text-white p-2 rounded w-full"
          >
            {" "}
            Register{" "}
          </button>
        </form>
        <span className="">
          {" "}
          Already have an account ?{" "}
          <Link className="text-blue-800 underline" to="/login">
            {" "}
            Login{" "}
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Register;
