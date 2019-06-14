import React from "react";
import styled from "styled-components";
import CartIcon from "../../../assets/images/cart_icon.png";

export interface ICartProps {
  count: number;
  style?: React.CSSProperties;
}

const CartContainer = styled.div`
  width: 1.8em;
  height: 1.8em;
  position: relative;
  transition: filter, 200ms ease-in-out;
  cursor: pointer;

  img,
  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

const Count = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  font-family: "Open Sans", sans-serif;
`;

export function Cart(props: ICartProps) {
  return (
    <CartContainer style={props.style}>
      <img src={CartIcon} alt="" />
      <Count>{props.count}</Count>
    </CartContainer>
  );
}
