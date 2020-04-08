import React from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./signup.module.scss";
import { LOGIN_URL, HOME_URL } from "../../contants/routerContants";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { WEB_TOKEN, USER_DETAILS } from "../../contants/storageContants";

export const Signup: React.FC = (props) => {
  const [name, setName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [cpwd, setCpwd] = React.useState("");
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const re = /\S+@\S+\.\S+/;
    if (name.length < 3) {
      toast.error("Name should of minimum 3 character");
    } else if (pwd.length < 4) {
      toast.error("Password should of minimum 4 character");
    } else if (pwd !== cpwd) {
      toast.error("Passwords doesn't match");
    } else if (!re.test(email)) {
      toast.error("Enter Valid Email");
    } else {
      axiosInstance
        .post("/user/signup", {
          name,
          email,
          password: pwd,
        })
        .then((res) => {
          localStorage.setItem(WEB_TOKEN, res.data.token);
          localStorage.setItem(USER_DETAILS, res.data.user);
          toast.success("Successfully created account");
          history.push(HOME_URL);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className={style.content}>
      <div className={style.loginPage}>
        <div className={style.form}>
          <h3 className={style.head}>Sign Up</h3>
          <form className={style.register_form}>
            <input
              type="text"
              placeholder="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPwd(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              required
              onChange={(e) => setCpwd(e.target.value)}
            />
            <input
              type="email"
              placeholder="email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={handleSignup}>
              create
            </button>
            <p className={style.message}>
              Already registered? <Link to={LOGIN_URL}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
