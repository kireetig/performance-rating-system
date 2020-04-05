import React from "react";
import style from "./navBar.module.scss";
import { Navbar, Nav } from "react-bootstrap";
import { LOGIN_URL, SIGN_UP_URL } from "../../contants/routerContants";
import { useHistory } from "react-router-dom";
import { WEB_TOKEN } from "../../contants/storageContants";

export const NavBar: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(WEB_TOKEN);
    history.push(LOGIN_URL);
  };

  const isVisible = () => {
    const path = history.location.pathname;
    return path !== LOGIN_URL && path !== SIGN_UP_URL;
  };

  return (
    <div className="container-fluid p-0">
      <Navbar className={style.nav} variant="dark">
        <Navbar.Brand href="/home" className={style.brand}>
          Performance Review System (PRS)
        </Navbar.Brand>
        {isVisible() && (
          <Nav className="ml-auto">
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        )}
      </Navbar>
    </div>
  );
};
