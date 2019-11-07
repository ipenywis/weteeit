import React from "react";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { device } from "../../../style/responsive";
export interface IButtonProps {
  /** Component to render as Button Container*/ omponent?: JSX.Element;
  /** Path to navigate to on button click */
  to?: string;
  children: any;
  large?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

  &:disabled {
    background-color: #a2a2a2;
    color: #000;
    cursor: not-allowed;
  }

  @media ${device.mobile} {
    width: auto;
    font-size: 25px !important;
  }
`;

function Button(props: IButtonProps) {
  const { to } = props;

  if (to)
    return (
      <ButtonContainer {...(props as any)}>
        <Link to={to}>{props.children}</Link>
      </ButtonContainer>
    );
  else
    return (
      <ButtonContainer {...(props as any)}>{props.children}</ButtonContainer>
    );
}

Button.defaultProps = {
  uppercase: true
};

export { Button };
