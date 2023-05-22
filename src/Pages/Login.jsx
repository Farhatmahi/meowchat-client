import React, { useContext } from "react";
import { toast } from "react-hot-toast";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { ChatContext } from "../Context/ChatProvider";
import { MutatingDots, Oval } from "react-loader-spinner";

const Login = () => {
  const { login, loading, setLoading } = useContext(AuthContext);
  const { setUser, user } = useContext(ChatContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (email === "") {
      toast.error("Email is required");
      setLoading(false);
      return false;
      
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      setLoading(false);
      return false;
    }
    fetch("http://localhost:4000/user/users")
      .then((res) => res.json())
      .then((data) => {
        const userFind = data.find((datae) => datae.email === email);

        if (userFind) {
          if (userFind.password === password) {
            login(userFind.email, password)
              .then((result) => {
                setUser(userFind);
                console.log(user);
                localStorage.setItem("user", JSON.stringify(userFind));
                toast.success(`Welcome ${userFind.username}`);
                localStorage.setItem("accessToken", userFind.token);
                navigate("/");
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          } else {
            toast.error("Incorrect password");
            setLoading(false);
          }
        } else {
          toast.error("User not registered");
          setLoading(false);
        }
      });
  };

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
              type="password"
              name="password"
              placeholder=""
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {loading ? (
                <div className="text-white flex justify-center items-center gap-3">
                  <Oval
                    height={20}
                    width={20}
                    color="#ffffff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#fdfdfd"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />{" "}
                  Logging in
                </div>
              ) : (
                "Login"
              )}
            </button>
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
