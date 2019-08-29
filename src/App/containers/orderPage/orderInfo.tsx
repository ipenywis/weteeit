import React from "react";
import styled from "styled-components/macro";
import { IAppContextProps } from "../../app.context";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { Divider } from "../../components/divider";
import { HorizontalWrapper } from "../../components/horizontalWrapper";

export interface IOrderInfo {
  cart: IAppContextProps["cart"];
}

const StyledVerticalWrapper = styled(VerticalWrapper)`
  align-items: flex-start;
`;

const OrderInfoContainer = styled.div`
  max-width: 25%;
  height: 100%;
  display: flex;
  flex: 1;
  background-color: #f5f5f5;
  padding: 30px;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const OrderProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const ProductThumbnail = styled.div`
  width: 5em;
  height: 5em;

  img {
    width: 100%;
    height: 100%;
  }
`;

interface ITextProps {
  thik?: boolean;
  margin?: boolean;
}

const Text = styled.div`
  margin-left: ${({ margin }: ITextProps) => (margin ? "5px" : "0")};
  font-weight: ${({ thik }: ITextProps) => (thik ? "800" : "500")};
`;

const MediumText = styled(Text)`
  color: #3d3d3d;
  font-size: 24px;
`;

const SmallText = styled(Text)`
  color: #3d3d3d;
  font-size: 18px;
`;

const SmallMutedText = styled(Text)`
  color: #79787857;
  font-size: 18px;
`;

const MediumMutedText = styled(Text)`
  color: #79787857;
  font-size: 20px;
`;

const SpacedWrapper = styled(HorizontalWrapper)`
  width: 100%;
  justify-content: space-between;
`;

export default function OrderInfo(props: IOrderInfo) {
  const { cart } = props;

  //Calculate Subtotal
  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.price;
  }

  const shipping = 500;

  //Calculate Total
  //TODO: Add Shipping to AppContext
  const total = subtotal + shipping;

  return (
    <OrderInfoContainer>
      <InnerContainer>
        {cart.map((product, idx) => {
          return (
            <>
              <OrderProductContainer key={`${product.name}-${idx}`}>
                <ProductThumbnail>
                  <img src={product.imageUrl} alt={`order-image-${idx}`} />
                </ProductThumbnail>
                <StyledVerticalWrapper>
                  <MediumText margin thik>
                    {product.name}
                  </MediumText>
                  <MediumMutedText margin thik>
                    {product.color} / {product.size} / {product.quantity}
                  </MediumMutedText>
                </StyledVerticalWrapper>
                <SmallText margin thik>
                  {product.price} DZD
                </SmallText>
              </OrderProductContainer>
              <Divider direction="horizontal" lightColor />
            </>
          );
        })}
        <VerticalWrapper>
          <SpacedWrapper>
            <SmallText thik>Subtotal</SmallText>
            <SmallMutedText thik>{subtotal} DZD</SmallMutedText>
          </SpacedWrapper>
          <SpacedWrapper>
            <SmallText thik>Shipping</SmallText>
            <SmallMutedText thik>{shipping} DZD</SmallMutedText>
          </SpacedWrapper>
        </VerticalWrapper>
        <Divider direction="horizontal" lightColor />
        <VerticalWrapper>
          <SpacedWrapper>
            <MediumText thik>TOTAL:</MediumText>
            <MediumMutedText thik>{total} DZD</MediumMutedText>
          </SpacedWrapper>
        </VerticalWrapper>
      </InnerContainer>
    </OrderInfoContainer>
  );
}
