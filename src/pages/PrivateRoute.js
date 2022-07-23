import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
  // <Route
  //   {...rest}
  //   render={() => {
  //     return user ? children : <Redirect to="/"></Redirect>;
  //   }}
  // ></Route>
};
export default PrivateRoute;
