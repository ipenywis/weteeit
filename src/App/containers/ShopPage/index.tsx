import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import Products from "./products";

export default function ShopPage(props: any) {
  return (
    <PageContainer>
      <HorizontalWrapper width="100%" height="100%">
        <SideNavigation />
        <Products />
      </HorizontalWrapper>
    </PageContainer>
  );
}
