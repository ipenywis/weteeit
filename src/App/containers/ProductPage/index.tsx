import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import { Product } from "./product";

export default function ProductPage(props: any) {
  return (
    <PageContainer>
      <HorizontalWrapper width="100%" height="100%">
        <SideNavigation />
        <Product productName={props.match.params.name} />
      </HorizontalWrapper>
    </PageContainer>
  );
}
