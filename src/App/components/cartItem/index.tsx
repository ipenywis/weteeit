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
import { device } from "../../../style/responsive";
import { HorizontalWrapper } from "../horizontalWrapper";

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

  @media ${device.mobile} {
    flex-direction: column;
    min-height: auto;
  }
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

const ControlsContainer = styled(HorizontalWrapper)`
  justify-content: center;
  align-items: center;

  @media ${device.mobile} {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
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

  @media ${device.mobile} {
    top: 2em;
    right: 11px;
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
    removeCartItem,
    keyCode
  } = props;

  const item: ICartItem = {
    keyCode,
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
    updateCartItem(keyCode, { ...item, size });
  };

  const onColorChange = (color: string) => {
    updateCartItem(keyCode, { ...item, color });
  };

  const onQuantityChange = (quantity: number) => {
    if (quantity >= 1) updateCartItem(keyCode, { ...item, quantity });
  };

  const removeItemFromCart = () => {
    removeCartItem(keyCode);
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
      <ControlsContainer>
        <SizeDropdown onSelect={onSizeChange} selected={item.size} />
        <ColorDropdown onSelect={onColorChange} selected={item.color} />
        <NumericInput
          value={quantity}
          onChange={e => onQuantityChange(parseInt(e.target.value))}
        />
      </ControlsContainer>
      <RemoveIconWrapper onClick={removeItemFromCart}>
        <FontAwesomeIcon icon={faTrashAlt} size="2x" />
      </RemoveIconWrapper>
    </CartItemContainer>
  );
}
