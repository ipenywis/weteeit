import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  allowAccess: boolean;
  redirectTo: string;
}

export function PrivateRoute(props: IPrivateRouteProps) {
  const { allowAccess } = props;

  if (allowAccess) return <Route {...props} />;
  else return <Redirect to={props.redirectTo} />;
}
