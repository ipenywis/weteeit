import React from "react";
import styled from "styled-components";
import CartIcon from "../../../assets/images/cart_icon.png";
import { Link } from "react-router-dom";

export interface ICartProps {
  count: number;
  style?: React.CSSProperties;
  pathname: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CartContainer = styled.div`
  width: 2.2em;
  height: 2.2em;
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
  font-size: 17px;
  font-weight: 700;
  font-family: "Open Sans", sans-serif;
`;

export function Cart(props: ICartProps) {
  const { onClick, pathname } = props;

  return (
    <Link to={pathname}>
      <CartContainer style={props.style} onClick={onClick}>
        <img src={CartIcon} alt="" />
        <Count>{props.count}</Count>
      </CartContainer>
    </Link>
  );
}
