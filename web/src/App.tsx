import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { LOGIN_URL, SIGN_UP_URL } from "./contants/routerContants";
import { Signup } from "./pages/Signup/Signup";
import { ProtectedPageBase } from "./components/ProtectedPageBase/ProtectedPageBase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from "./components/NavBar/NavBar";

function App() {

  return (
    <div>
      <Router>
      <NavBar/>
        <Switch>
          <Route path={LOGIN_URL} component={Login} />
          <Route path={SIGN_UP_URL} component={Signup} />
          <Route path={"/"} component={ProtectedPageBase} />
        </Switch>
      </Router>
      <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000} />
    </div>
  );
}

export default App;
