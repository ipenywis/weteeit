import React from "react";
import styled from "styled-components/macro";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { ICartItem } from "../../typings/cart";
import { CartItem } from "../../components/cartItem";
import { IAppContextProps } from "../../app.context";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { Button } from "../../components/button";
import { withRouter } from "react-router";
import { IWithRouterProps } from "../../typings/common";

export interface ICartProps extends IWithRouterProps {
  cart: ICartItem[];
  instructions: IAppContextProps["instructions"];
  updateCartItem: IAppContextProps["updateCartItem"];
  removeCartItem: IAppContextProps["removeCartItem"];
  setCanOrder: IAppContextProps["setCanOrder"];
  setInstructions: IAppContextProps["setInstructions"];
}

const CartContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding: 35px;
  overflow-y: auto;
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 8em;
  resize: none;
  padding: 15px;
  color: #3d3d3d;
  border: 1px solid #79787857;
  margin-top: 2em;
  margin-bottom: 2em;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: #79787857;
  }
`;

const Total = styled.div`
  font-size: 45px;
  font-weight: 800;
  color: #3d3d3d;
  margin-top: 1em;
`;
const FooterContainer = styled(VerticalWrapper)`
  width: 100%;
  align-items: flex-end;
`;

const CheckoutButton = styled(Button)`
  width: 13em;
  font-size: 35px;
  font-weight: 800;
`;

class ShoppingCart extends React.Component<ICartProps> {
  constructor(props: ICartProps) {
    super(props);
  }

  onInstructionsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.setInstructions(e.target.value);
  }

  calculateCartTotal() {
    let total = 0;
    //Count Totla
    for (const item of this.props.cart) {
      total += +item.price;
    }
    return total;
  }

  private checkout() {
    this.props.setCanOrder(true);
    this.props.history.push("/order");
  }

  render() {
    const { cart, updateCartItem, removeCartItem, instructions } = this.props;

    const isCartEmpty = cart.length === 0;
    const currency = "DZD";
    const total = this.calculateCartTotal();

    return (
      <CartContainer>
        <Title>SHOPPING CART</Title>
        <MutedText>
          {cart.length} {cart.length <= 1 ? "item" : "items"} in the bag!
        </MutedText>
        {!isCartEmpty &&
          cart.map((cartItem, idx) => (
            <CartItem
              {...cartItem}
              key={`${cartItem.name}-${idx}`}
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
            />
          ))}
        {isCartEmpty && (
          <CartIsEmptyWarning>Your Cart is Empty!</CartIsEmptyWarning>
        )}
        {!isCartEmpty && (
          <TextArea
            value={instructions || undefined}
            placeholder="Instructions for the seller..."
            onChange={this.onInstructionsChange.bind(this)}
          />
        )}
        {!isCartEmpty && (
          <FooterContainer>
            {!isCartEmpty && (
              <Total>
                TOTAL:
                {total}
                {currency}
              </Total>
            )}
            <CheckoutButton large onClick={this.checkout.bind(this)}>
              Check out
            </CheckoutButton>
          </FooterContainer>
        )}
      </CartContainer>
    );
  }
}

export default withRouter<ICartProps>(ShoppingCart);
