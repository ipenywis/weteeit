import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import { AppContext } from "../../app.context";

export default function OrderPage(props: any) {
  return (
    <AppContext.Consumer>
      {({ cart }) => (
        <PageContainer>
          <HorizontalWrapper width="100%" height="100%">
            <SideNavigation cart={(cart && cart.length) || 0} />
          </HorizontalWrapper>
        </PageContainer>
      )}
    </AppContext.Consumer>
  );
}
