import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CiFlag1 } from "react-icons/ci";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { ChatContext } from "../Context/ChatProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { setUser, user } = useContext(ChatContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (email === "") {
      toast.error("Email is required");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return false;
    }
    fetch("http://localhost:4000/user/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        const userFind = data.find((datae) => datae.email === email);
        // console.log(userFind);

        if (userFind) {
          if (userFind.password === password) {
            login(userFind.email, password)
              .then((result) => {
                // console.log(result);
                // console.log(userFind);
                setUser(userFind);
                console.log(user);
                localStorage.setItem("user", JSON.stringify(userFind));
                toast.success(`Welcome ${userFind.username}`);
                localStorage.setItem("accessToken", userFind.token);
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            toast.error("Incorrect password");
          }
        } else {
          toast.error("User not registered");
        }
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const email = form.email.value;
  //   const password = form.password.value;
  //   const user = {
  //     email,
  //     password,
  //   };
  //   if (email === "") {
  //     toast.error("Email is required");
  //     return false;
  //   } else if (password.length < 6) {
  //     toast.error("Password should be at least 6 characters");
  //     return false;
  //   }

  //   fetch("http://localhost:4000/user/login", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then(data => console.log(data));
  // };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen px-4 lg:px-0">
      <div className="text-center mb-4">
        <h1 className="text-5xl">Welcome back!</h1>
        <p className="text-2xl">Please login to continue</p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body w-100">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder=""
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              name="password"
              placeholder=""
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <label className="label text-center">
            <p>
              New here?{" "}
              <Link to="/register">
                <span className="text-primary hover:text-accent hover:underline">
                  Register now!
                </span>
              </Link>
            </p>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
