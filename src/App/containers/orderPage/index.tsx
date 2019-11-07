import React, { useState } from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import { AppContext } from "../../app.context";
import OrderForm from "./orderForm";
import OrderInfo from "./orderInfo";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";
import { device } from "../../../style/responsive";

const StyledPageContainer = styled(PageContainer)`
  overflow-y: auto;
  height: 100%;
`;

const SidesContainer = styled(HorizontalWrapper)`
  @media ${device.mobile} {
    flex-direction: column-reverse;
  }
`;

export default function OrderPage(props: any) {
  const [shipping, setShipping] = useState<number | null>(null);
  //Default shipping price
  let shippingPrice = 300;

  return (
    <ApolloConsumer>
      {client => (
        <AppContext.Consumer>
          {({ cart, setCart, instructions }) => (
            <StyledPageContainer>
              <HorizontalWrapper width="100%" height="100%">
                <SidesContainer width="100%" height="100%">
                  <OrderForm
                    client={client}
                    cart={cart}
                    instructions={instructions}
                    setCart={setCart}
                    shippingPrice={shipping}
                    setShippingPrice={setShipping}
                  />
                  <OrderInfo cart={cart} shippingPrice={shipping} />
                </SidesContainer>
              </HorizontalWrapper>
            </StyledPageContainer>
          )}
        </AppContext.Consumer>
      )}
    </ApolloConsumer>
  );
}
