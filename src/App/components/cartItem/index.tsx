import React from "react";
import styled from "styled-components/macro";
import { VerticalWrapper } from "../verticalWrapper";
import { SizeDropdown } from "../sizeSelector";
import { ICartItem } from "../../typings/cart";
import { IAppContextProps } from "../../app.context";

export interface ICartItemProps extends ICartItem {
  updateCartItem: IAppContextProps["updateCartItem"];
}

const CartItemContainer = styled.div`
  width: 100%;
  min-height: 10em;
  padding: 18px 2px;
  border-top: 1px solid #79787857;
  border-bottom: 1px solid #79787857;
  display: flex;
  margin-top: 3em;
  align-items: center;
`;

const Image = styled.div`
  width: 12em;
  height: 12em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const DetailsContainer = styled(VerticalWrapper)`
  margin-left: 35px;
  margin-right: 25px;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 47px;
  font-weight: 800;
`;

const MutedText = styled.div`
  color: rgba(15, 15, 15, 0.2);
  font-size: 30px;
  font-style: italic;
  font-weight: 600;
  width: fit-content;
`;

export function CartItem(props: ICartItemProps) {
  const {
    name,
    id,
    color,
    type,
    size,
    quantity,
    imageUrl,
    price,
    __typename,
    updateCartItem
  } = props;

  const item: ICartItem = {
    name,
    price,
    quantity,
    size,
    type,
    color,
    id,
    __typename,
    imageUrl
  };

  const onSizeChange = (size: string) => {
    updateCartItem(name, { ...item, size });
  };

  return (
    <CartItemContainer>
      <Image>
        <img src={imageUrl} alt="cart-item-image" />
      </Image>
      <DetailsContainer>
        <Name>{name}</Name>
        <MutedText>{price} DZD</MutedText>
      </DetailsContainer>
      <SizeDropdown onSelect={onSizeChange} />
    </CartItemContainer>
  );
}
