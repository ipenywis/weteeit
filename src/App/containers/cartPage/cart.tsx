import React from "react";
import styled from "styled-components/macro";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { ICartItem } from "../../typings/cart";
import { CartItem } from "../../components/cartItem";
import { IAppContextProps } from "../../app.context";

export interface ICartProps {
  cart: ICartItem[];
  updateCartItem: IAppContextProps["updateCartItem"];
  removeCartItem: IAppContextProps["removeCartItem"];
}

const CartContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding: 35px;
`;

const Title = styled.div`
  font-size: 52px;
  font-weight: 800;
  color: #3d3d3d;
`;

const MutedText = styled.div`
  color: rgba(15, 15, 15, 0.2);
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  margin-left: 5px;
`;

const CartIsEmptyWarning = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  font-size: 30px;
  font-weight: 800;
  color: rgba(15, 15, 15, 0.8);
  justify-content: center;
`;

export class ShoppingCart extends React.Component<ICartProps> {
  constructor(props: ICartProps) {
    super(props);
  }

  render() {
    const { cart, updateCartItem, removeCartItem } = this.props;

    return (
      <CartContainer>
        <Title>SHOPPING CART</Title>
        <MutedText>
          {cart.length} {cart.length <= 1 ? "item" : "items"} in the bag!
        </MutedText>
        {cart.length > 0 &&
          cart.map((cartItem, idx) => (
            <CartItem
              {...cartItem}
              key={`${cartItem.name}-${idx}`}
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
            />
          ))}
        {cart.length === 0 && (
          <CartIsEmptyWarning>Your Cart is Empty!</CartIsEmptyWarning>
        )}
      </CartContainer>
    );
  }
}
