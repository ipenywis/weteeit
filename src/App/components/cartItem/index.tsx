import React from "react";
import styled from "styled-components/macro";
import { VerticalWrapper } from "../verticalWrapper";
import { SizeDropdown } from "../sizeSelector";
import { ICartItem } from "../../typings/cart";
import { IAppContextProps } from "../../app.context";
import { ColorDropdown } from "../colorSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NumericInput } from "../numericInput";

export interface ICartItemProps extends ICartItem {
  updateCartItem: IAppContextProps["updateCartItem"];
  removeCartItem: IAppContextProps["removeCartItem"];
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
  position: relative;
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

const RemoveIconWrapper = styled.div`
  position: absolute;
  right: 3em;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  svg {
    transition: filter 180ms ease-in-out;
    &:hover {
      filter: contrast(0.3);
    }
  }
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
    updateCartItem,
    removeCartItem
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

  const onColorChange = (color: string) => {
    updateCartItem(name, { ...item, color });
  };

  const onQuantityChange = (quantity: number) => {
    if (quantity >= 1) updateCartItem(name, { ...item, quantity });
  };

  const removeItemFromCart = () => {
    removeCartItem(name);
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
      <SizeDropdown onSelect={onSizeChange} selected={item.size} />
      <ColorDropdown onSelect={onColorChange} selected={item.color} />
      <NumericInput
        value={quantity}
        onChange={e => onQuantityChange(parseInt(e.target.value))}
      />
      <RemoveIconWrapper onClick={removeItemFromCart}>
        <FontAwesomeIcon icon={faTrashAlt} size="2x" />
      </RemoveIconWrapper>
    </CartItemContainer>
  );
}
