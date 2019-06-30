import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
export interface IButtonProps {
  /** Component to render as Button Container*/
  //component?: JSX.Element;
  /** Path to navigate to on button click */
  to?: string;
  children?: any;
  large?: boolean;
  uppercase?: boolean;
}

export const ButtonContainer = styled.button`
  background-color: #3d3d3d;
  color: #fff;
  border: 4px solid #3d3d3d;
  padding: ${(props: IButtonProps) => (props.large ? "16px" : "9px")};
  font-weight: ${(props: IButtonProps) => (props.large ? "600" : "500")};
  font-size: ${(props: IButtonProps) => (props.large ? "25px" : "20px")};
  text-transform: ${(props: IButtonProps) =>
    props.uppercase ? "uppercase" : "lowercase"};
  outline: none;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  transition-property: border, color, background-color;
  transition: 250ms ease-in-out;

  &:hover {
    background-color: transparent;
    color: #3d3d3d;
  }
`;

function Button(props: IButtonProps) {
  const { to } = props;

  if (to)
    return (
      <ButtonContainer {...props}>
        <Link to={to}>{props.children}</Link>
      </ButtonContainer>
    );
  else return <ButtonContainer {...props}>{props.children}</ButtonContainer>;
}

Button.defaultProps = {
  uppercase: true
};

export { Button };
