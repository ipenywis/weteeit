import React from "react";
import styled from "styled-components/macro";
import { IAppContextProps } from "../../app.context";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { Divider } from "../../components/divider";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { device, size } from "../../../style/responsive";
import { BrandLogo } from "../../components/brandLogo";
import { useMediaQuery } from "react-responsive";
import { CancelOrder } from "./cancelOrder";
import { withRouter } from "react-router";
import { IWithRouterProps } from "../../typings/common";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IOrderInfo extends IWithRouterProps {
  cart: IAppContextProps["cart"];
  shippingPrice: number | null;
}

const StyledVerticalWrapper = styled(VerticalWrapper)`
  align-items: flex-start;
`;

const OrderInfoContainer = styled.div`
  max-width: 25%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;

  @media ${device.mobile} {
    width: 100%;
    height: auto;
    max-width: 100%;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 30px;

  @media ${device.mobile} {
    padding: 1.3em 5px;
  }
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

const TopContainer = styled(HorizontalWrapper)`
  width: 100%;
  justify-content: center;
  position: relative;
`;

function OrderInfo(props: IOrderInfo) {
  const { cart, shippingPrice } = props;

  //Calculate Subtotal
  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.price;
  }

  const shipping = shippingPrice || "Select Wilaya";

  //Calculate Total
  //TODO: Add Shipping to AppContext
  const total = typeof shipping === "string" ? shipping : subtotal + shipping;

  const isMobile = useMediaQuery({ maxWidth: size.mobileMinWidth });

  const cancelOrder = () => {
    props.history.push("cart");
  };

  return (
    <OrderInfoContainer>
      {isMobile && (
        <TopContainer>
          <BrandLogo color="black" size="xxl" diagnol={true} />
          <CancelOrder onClick={cancelOrder}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </CancelOrder>
        </TopContainer>
      )}
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
            <SmallMutedText thik>
              {typeof shipping === "string" ? shipping : shipping + " DZD"}
            </SmallMutedText>
          </SpacedWrapper>
        </VerticalWrapper>
        <Divider direction="horizontal" lightColor />
        <VerticalWrapper>
          <SpacedWrapper>
            <MediumText thik>TOTAL:</MediumText>
            <MediumMutedText thik>
              {typeof total === "string" ? total : total + " DZD"}
            </MediumMutedText>
          </SpacedWrapper>
        </VerticalWrapper>
      </InnerContainer>
    </OrderInfoContainer>
  );
}

export default withRouter(OrderInfo);
