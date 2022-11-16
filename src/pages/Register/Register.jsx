import { useState } from "react";

import { setUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/GoogleIcon";
import {
  createUserWithMail,
  LoginWithGoogle,
} from "../../authencitation/firebase";
import "./register.css";
import { useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const changeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (userInfo.email && userInfo.password) {
      createUserWithMail(
        userInfo.email,
        userInfo.password,
        navigate,
        setErr,
        setUserInfo
      );
    } else {
      setErr("Please fill in the email and password fields");
      setTimeout(() => setErr(""), 3000);
    }
  };
  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    const register = true;
    const login = false;
    LoginWithGoogle(dispatch, setUser, navigate, register, login);
  };
  return (
    <div className="container">
      <div className="bg-img"></div>

      <form action="submit" onSubmit={handleClick}>
        <div className="form">
          <div className="err-msg">{err && <span>{err}</span>}</div>
          <div className="frame">
            <div className="inputs">
              <div className="label-div">
                <label className="info-label">Name</label>
                <label className="info-label">Surname</label>
                <label className="info-label">Email address</label>
                <label className="info-label">Password</label>
              </div>
              <div className="label-div">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={changeUserInfo}
                  value={userInfo.name}
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={userInfo.surname}
                  onChange={changeUserInfo}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={userInfo.email}
                  onChange={changeUserInfo}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userInfo.password}
                  onChange={changeUserInfo}
                />
              </div>
            </div>

            <div className="sing">
              <button className="link" type="submit" onClick={handleClick}>
                Sing in
              </button>
              <button
                className="google-btn"
                type="submit"
                onClick={handleLoginWithGoogle}
              >
                Continue With Google
                <GoogleIcon />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
