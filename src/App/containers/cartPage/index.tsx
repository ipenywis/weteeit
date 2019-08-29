import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import { AppContext } from "../../app.context";
import ShoppingCart from "./cart";

export default function CartPage(props: any) {
  return (
    <AppContext.Consumer>
      {({
        cart,
        updateCartItem,
        removeCartItem,
        setCanOrder,
        instructions,
        setInstructions
      }) => (
        <PageContainer>
          <HorizontalWrapper width="100%" height="100%">
            <SideNavigation cart={(cart && cart.length) || 0} />
            <ShoppingCart
              cart={cart}
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
              setCanOrder={setCanOrder}
              instructions={instructions}
              setInstructions={setInstructions}
            />
          </HorizontalWrapper>
        </PageContainer>
      )}
    </AppContext.Consumer>
  );
}
