import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { LoginWithGoogle, LoginWithMail } from "../../authencitation/firebase";
import "./login.css";
import { setUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/GoogleIcon";
import { toastErrorNotify, toastSuccessNotify } from "../../helpers/Toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      LoginWithMail(
        email,
        password,
        dispatch,
        setUser,
        navigate,
        setErr,
        toastSuccessNotify,
        toastErrorNotify
      );
    } else {
      setErr("Please fill in the email and password fields");
      setTimeout(() => setErr(""), 3000);
    }
  };
  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    const register = false;
    const login = true;
    LoginWithGoogle(dispatch, setUser, navigate, register, login);
  };
  return (
    <div className="container">
      <div className="img"></div>

      <Form onSubmit={handleClick}>
        <div className="form">
          <div className="err-msg">{err && <span>{err}</span>}</div>
          <div className="frame">
            <div className="inputs">
              <div className="label-div">
                <Form.Label className="info-label">Email address</Form.Label>
                <Form.Label className="info-label">Password</Form.Label>
              </div>
              <div className="label-div">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="sing">
              <Button className="link" type="submit" onClick={handleClick}>
                Login
              </Button>
              <Button
                className="google-btn"
                type="submit"
                onClick={handleLoginWithGoogle}
              >
                Continue With Google
                <GoogleIcon />
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
