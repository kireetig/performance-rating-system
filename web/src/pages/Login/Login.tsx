import React from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./login.module.scss";
import { SIGN_UP_URL, HOME_URL } from "../../contants/routerContants";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { WEB_TOKEN, USER_ID } from "../../contants/storageContants";

export const Login: React.FC = (props) => {
  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const history = useHistory();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (username.length === 0) {
      toast.error("Username can't be empty");
    } else if (pwd.length < 4) {
      toast.error("Password should be minimum of 4 character");
    } else {
      axiosInstance
        .post("/user/login", {
          email: username,
          password: pwd,
        })
        .then((res) => {
          localStorage.setItem(WEB_TOKEN, res.data.token);
          localStorage.setItem(USER_ID, res.data.userId);
          toast.success("Successfully logined In");
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
          <h3 className={style.head}>Sign In</h3>
          <form className={style.login_form}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPwd(e.target.value)}
            />
            <button type="submit" onClick={handleLogin}>
              login
            </button>
            <p className={style.message}>
              Not registered? <Link to={SIGN_UP_URL}>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
