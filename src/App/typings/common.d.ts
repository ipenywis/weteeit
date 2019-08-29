import { Location, History } from "history";
import { match } from "react-router";

export enum Intent {
  PRIMARY = "PRIMARY",
  SUCCESS = "SUCCESS",
  DANGER = "DANGER",
  INFO = "INFO"
}

//Input Errors
export interface IInputError {
  [key: string]: string | undefined;
}

//react-router withRouter Props
export interface IWithRouterProps {
  history: History;
  location: Location;
  match: match;
}
