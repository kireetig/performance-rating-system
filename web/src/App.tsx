import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import {
  LOGIN_URL,
  SIGN_UP_URL,
  PROJECT_RATING,
} from "./contants/routerContants";
import { Signup } from "./pages/Signup/Signup";
import { ProtectedPageBase } from "./components/ProtectedPageBase/ProtectedPageBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Rating } from "./pages/Rating/Rating";
import style from "./app.module.scss";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <div className={style.body}>
          <Switch>
            <Route path={LOGIN_URL} component={Login} />
            <Route path={SIGN_UP_URL} component={Signup} />
            <Route path={PROJECT_RATING} component={Rating} />
            <Route path={"/"} component={ProtectedPageBase} />
          </Switch>
        </div>
      </Router>
      <div className={style.footer}>
        <div className="ml-auto">
          Developed by{" "}
          <a href="mailto:kireeti17@gmail.com">
            <b>Kireeti Ganisetti</b>
          </a>
        </div>
      </div>
      <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000} />
    </div>
  );
}

export default App;
