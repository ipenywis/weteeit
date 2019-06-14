import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const ButtonContainer = styled.button``;

export interface IButtonProps {
  /** Component to render as Button Container*/
  //component?: JSX.Element;
  /** Path to navigate to on button click */
  to?: string;
  children?: any;
}

export function Button(props: IButtonProps) {
  const { to } = props;

  if (to)
    return (
      <ButtonContainer>
        <Link to={to}>{props.children}</Link>
      </ButtonContainer>
    );
  else return <ButtonContainer>{props.children}</ButtonContainer>;
}
