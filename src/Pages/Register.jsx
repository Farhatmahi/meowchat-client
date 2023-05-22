import React, { Children, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { Oval } from "react-loader-spinner";

const Register = () => {
  const { createUser, updateUser, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [image, setimage] = useState("");
  const [isOff, setisOff] = useState(false);
  const [dataImage, setdataImage] = useState([]);

  // console.log(image);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const user = {
        username: username,
        email: email,
        password: password,
        image: image,
      };

      console.log(user);

      fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            createUser(email, password)
              .then((result) => {
                const userInfo = {
                  photoURL: user.avatar,
                  displayName: user.username,
                };

                updateUser(userInfo).then((result) => {
                  toast.success(`Welcome ${username}`);
                  localStorage.setItem("accessToken", data.token);
                  localStorage.setItem("user", JSON.stringify(data));
                  navigate("/");
                  setLoading(false);
                });
              })
              .catch((err) => {
                console.error(err);
                setLoading(false);
                toast.error("Email is already in use");
              });
          } else {
            toast.error(data.message);
            setLoading(false);
          }
        });
    }
  };

  const callAvatar = async () => {
    var imgs = [];
    try {
      for (let i = 0; i < 4; i++) {
        const images = await `https://api.multiavatar.com/${Math.round(
          Math.random() * 1000
        )}.png`;
        imgs.push(images);
      }
      setdataImage(imgs);
    } catch (error) {}
  };

  useEffect(() => {
    callAvatar();
  }, []);

  const moreAvatar = (e) => {
    e.preventDefault();
    callAvatar();
    setisOff(true);
  };

  const handleValidation = (e) => {
    const { username, email, password } = values;
    if (username.length < 3) {
      toast.error("Username should be atleast 3 characters");
      setLoading(false)
      return false;
    } else if (email === "") {
      toast.error("Email is required");
      setLoading(false)
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      setLoading(false)
      return false;
    } else if (image === "") {
      toast.error("Please choose an avatar");
      setLoading(false)
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen px-4 lg:px-0">
      <div className="text-center mb-4">
        <h1 className="text-5xl">Welcome to MeowChat</h1>
        <p className="text-2xl">Please register to continue</p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body w-100">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder=""
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder=""
              name="password"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="flex justify-between my-4">
              {dataImage?.map((img) => (
                <div
                  className={
                    img === image
                      ? " rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      : " rounded-full hover:scale-110"
                  }
                  onClick={() => setimage(img)}
                  key={img}
                >
                  <img src={img} width="50" alt="avatar" />
                </div>
              ))}
            </div>
            <div className={isOff ? "d-none" : "d-block"}>
              <button onClick={moreAvatar} className="btn btn-sm text-center">
                Browse More
              </button>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
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
                  Signing in
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
          <label className="label text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-primary hover:text-accent hover:underline">
                  Login!
                </span>
              </Link>
            </p>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Register;
