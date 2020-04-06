import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { HOME_URL, LOGIN_URL, CREATE_PROJECT_URL, PROJECT_DETAILS_URL } from "../../contants/routerContants";
import { Home } from "../../pages/Home/Home";
import { WEB_TOKEN } from "../../contants/storageContants";
import { CreateProject } from "../../pages/CreateProject/CreateProject";

export const ProtectedPageBase: React.FC = () => {
    const history = useHistory();

    React.useEffect(() => {
        const token = localStorage.getItem(WEB_TOKEN);
     
        if (!token) {
          history.push(LOGIN_URL);
        }
      }, [history.location.pathname]);
      
  return (
    <>
      <Route path={CREATE_PROJECT_URL} component={CreateProject} exact />
      <Route path={PROJECT_DETAILS_URL} component={CreateProject} exact/>
      <Route path={HOME_URL} component={Home} />
      {history.location.pathname === '/' && <Redirect to={HOME_URL} />}
    </>
  );
};
