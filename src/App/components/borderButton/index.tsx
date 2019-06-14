import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export interface IBorderButtonProps {
  large?: boolean;
  uppercase?: boolean;
  to?: string;
  children?: any;
}

export const ButtonContainer = styled.button`
  min-width: 6em;
  border: 3px solid #fff;
  background-color: transparent;
  color: #fff;
  padding: ${(props: IBorderButtonProps) => (props.large ? "10px" : "5px")};
  font-weight: ${(props: IBorderButtonProps) => (props.large ? "800" : "500")};
  font-size: ${(props: IBorderButtonProps) => (props.large ? "21px" : "18px")};
  text-transform: ${(props: IBorderButtonProps) =>
    props.uppercase ? "uppercase" : "lowercase"};
  font-family: "Open Sans", sans-serif;
  margin: 0 12px;
  transition: 250ms ease-in-out;
  transition-property: background-color, color;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export function BorderButton(props: IBorderButtonProps) {
  const { to } = props;

  if (to)
    return (
      <ButtonContainer {...props}>
        <Link to={to}>{props.children}</Link>
      </ButtonContainer>
    );
  else return <ButtonContainer {...props}>{props.children}</ButtonContainer>;
}
