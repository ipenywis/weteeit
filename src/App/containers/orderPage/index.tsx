import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import { AppContext } from "../../app.context";
import OrderForm from "./orderForm";
import OrderInfo from "./orderInfo";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";

const StyledPageContainer = styled(PageContainer)`
  overflow-y: auto;
  height: 100%;
`;

export default function OrderPage(props: any) {
  return (
    <ApolloConsumer>
      {client => (
        <AppContext.Consumer>
          {({ cart, setCart, instructions }) => (
            <StyledPageContainer>
              <HorizontalWrapper width="100%" height="100%">
                <HorizontalWrapper width="100%" height="100%">
                  <OrderForm
                    client={client}
                    cart={cart}
                    instructions={instructions}
                    setCart={setCart}
                  />
                  <OrderInfo cart={cart} />
                </HorizontalWrapper>
              </HorizontalWrapper>
            </StyledPageContainer>
          )}
        </AppContext.Consumer>
      )}
    </ApolloConsumer>
  );
}
