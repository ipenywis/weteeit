import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components/macro";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { Divider } from "../../components/divider";
import { SizeSelector } from "../../components/sizeSelector";
import { ColorSelector } from "../../components/colorSelector";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { Button } from "../../components/button";
import { NumericInput } from "../../components/numericInput";
import { withRouter, match } from "react-router-dom";
import { IAppContextProps } from "../../app.context";
import { Location, History } from "history";
import { ICartItem } from "../../typings/cart";
import { IProduct } from "../../typings/product";
import { Popup } from "../../components/popup";
import { randomTimeKey } from "../../../utils/common";

export interface IProductInfoProps extends IProduct {
  location: Location;
  history: History;
  match: match;
  cart: IAppContextProps["cart"];
  setCart: IAppContextProps["setCart"];
}

const ProductInfoContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding: 0 12%;
`;

const Name = styled.div`
  font-size: 40px;
  color: #3d3d3d;
  font-weight: 700;
`;

const MutedText = styled.div`
  color: rgba(15, 15, 15, 0.2);
  font-size: 24px;
  font-style: italic;
  font-weight: 600;
  margin-left: 5px;
`;

const Price = styled.div`
  font-size: 60px;
  color: #3d3d3d;
  font-weight: 800;
`;

const QuantityContainer = styled(HorizontalWrapper)`
  width: 100%;
  margin-top: 2em;
`;

const InfoContainer = styled(VerticalWrapper)`
  width: 100%;
  margin-top: 1em;
  align-items: center;
`;

const InfoText = styled.div`
  font-size: 16px;
  color: rgba(15, 15, 15, 0.4);
`;

function SuccessPopup() {
  return (
    <Popup isOpen={true}>Item has been successfully added to your cart</Popup>
  );
}

interface IProductInfoState {
  size: string;
  quantity: number;
  color: string;
  isPopupOpen: boolean;
}

class ProductInfo extends React.Component<IProductInfoProps> {
  state: IProductInfoState;

  constructor(props: IProductInfoProps) {
    super(props);
    this.state = {
      size: "L",
      color: "black",
      quantity: 1,
      isPopupOpen: false
    };
  }

  toggleSuccessPopup(callback?: () => void) {
    this.setState({ isPopupOpen: true });
    //Hide Popup in 2s
    setTimeout(() => this.setState({ isPopupOpen: false }, callback), 2000);
  }

  addToCart(item: ICartItem) {
    this.toggleSuccessPopup(() =>
      this.props.setCart(prevCartItems => {
        return [...prevCartItems, item];
      })
    );
  }

  updateSize(size: string) {
    this.setState({ size });
  }

  updateQuantity(quantity: number) {
    this.setState({ quantity });
  }

  updateColor(color: string) {
    this.setState({ color });
  }

  render() {
    const { id, __typename, type, name, price, imageUrl, cart } = this.props;
    const { size, color, quantity, isPopupOpen } = this.state;

    //NOTE: Random key for adding multiple instances of same product type to the cart
    const keyCode = randomTimeKey();

    const item: ICartItem = {
      __typename,
      keyCode,
      id,
      type,
      name,
      price,
      size,
      color,
      quantity,
      imageUrl
    };

    const currency = "DZD";

    const isItemInCart = cart.some(cartItem => {
      return item.name === cartItem.name;
    });

    return (
      <ProductInfoContainer>
        <Name>{name}</Name>
        <MutedText>By Weteeit</MutedText>
        <Divider direction="horizontal" />
        <MutedText>Price</MutedText>
        <Price>
          {price} {currency}
        </Price>
        <Divider />
        <MutedText>Sizes</MutedText>
        <SizeSelector selected={size} onSelect={this.updateSize.bind(this)} />
        <Divider />
        <MutedText>Colors</MutedText>
        <ColorSelector
          selected={color}
          onSelect={colorName => {
            this.updateColor(colorName);
          }}
        />
        <Divider />
        <QuantityContainer width="100%" spaceEvenly>
          <NumericInput
            value={quantity}
            onChange={e =>
              parseInt(e.target.value) >= 1 &&
              this.updateQuantity(parseInt(e.target.value))
            }
          />
          <Button
            large={true}
            onClick={() => this.addToCart(item)}
            //disabled={isItemInCart}
          >
            Add to Cart
          </Button>
        </QuantityContainer>
        {/*<InfoContainer>
          {isItemInCart && (
            <InfoText>This {item.type} is already in your Cart</InfoText>
          )}
          </InfoContainer>*/}
        {isPopupOpen && <SuccessPopup />}
      </ProductInfoContainer>
    );
  }
}

export default withRouter<IProductInfoProps>(ProductInfo);
