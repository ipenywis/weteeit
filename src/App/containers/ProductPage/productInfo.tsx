import React, { useState } from "react";
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
import { GetProducts_products as IProduct } from "../../typings/graphql-types";

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

function ProductInfo(props: IProductInfoProps) {
  const { id, __typename, type, name, price, imageUrl, cart, setCart } = props;

  const currency = "DZD";
  //Size State
  const [size, updateSize] = useState("M");
  //Color State
  const [color, updateColor] = useState("black");
  //Quantity State
  const [quantity, updateQuantity] = useState(1);

  const item: ICartItem = {
    __typename,
    id,
    type,
    name,
    price,
    size,
    color,
    quantity,
    imageUrl
  };

  const isItemInCart = cart.some(cartItem => {
    return item.name === cartItem.name;
  });

  const addToCart = (item: ICartItem) => {
    setCart(prevCartItems => {
      return [...prevCartItems, item];
    });
  };

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
      <SizeSelector selected={size} onSelect={updateSize} />
      <Divider />
      <MutedText>Colors</MutedText>
      <ColorSelector
        selected={color}
        onSelect={colorName => {
          updateColor(colorName);
        }}
      />
      <Divider />
      <QuantityContainer width="100%" spaceEvenly>
        <NumericInput
          value={quantity}
          onChange={e =>
            parseInt(e.target.value) >= 1 &&
            updateQuantity(parseInt(e.target.value))
          }
        />
        <Button
          large={true}
          onClick={() => addToCart(item)}
          disabled={isItemInCart}
        >
          Add to Cart
        </Button>
      </QuantityContainer>
      <InfoContainer>
        {isItemInCart && (
          <InfoText>This {item.type} is already in your Cart</InfoText>
        )}
      </InfoContainer>
    </ProductInfoContainer>
  );
}

export default withRouter<IProductInfoProps>(ProductInfo);
