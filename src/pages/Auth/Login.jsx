import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginService, setTokenService } from "../../services/services";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    if (      
      email.length > 0 &&
      password.length > 0
    ) {
      loginService(data)
        .catch((err) => {
          toast.error("wrong information");
          console.log(e);
        })
        .then(async (res) => {
          if (res !== undefined) {
            const token = await res.data?.token;
            localStorage.setItem("token", token);
            setTokenService(token).then((res) => {
              toast.success("successfully login!");
              navigate("/");
            });
          }
        });
    } else {
      toast.error("Please Provide valid Email and Password!");
    }
  };

  return (
    <div className="mb-auto flex mt-10 justify-center ">
      <div className="w-96 flex flex-col gap-6 items-center p-6 shadow-slate-400 shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-800"> Sign in </h1>
        <p> Welcome, login to continue </p>

        <form
          onSubmit={submit}
          className="flex gap-6 flex-col items-center w-80"
          method="POST"
        >
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
            Sign in{" "}
          </button>
        </form>

        <span>
          {" "}
          Do not have account ?{" "}
          <Link className="text-blue-800 underline" to="/register">
            {" "}
            Register{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
