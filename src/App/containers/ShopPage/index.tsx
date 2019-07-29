import React, { useState } from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import Products from "./products";
import { AppContext } from "../../app.context";
import { ApolloConsumer } from "react-apollo";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { FilterBar } from "../../components/filterBar";
import { Filters, IFilterItem } from "../../components/filterBar/constants";
import styled from "styled-components";
import { withRouter } from "react-router";

const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  margin-left: 1em;
`;

function ShopPage(props: any) {
  //Using Hooks
  const [currentProductType, setProductType] = useState("tshirt");
  const onFilterItemClick = (itemKey: string, item: IFilterItem) => {
    setProductType(itemKey);
    //TODO: Support other filter appliers | only supports query for now
    props.history && props.history.push(`/shop?type=${item.query}`);
  };

  return (
    <ApolloConsumer>
      {client => (
        <AppContext.Consumer>
          {({ cart }) => (
            <PageContainer>
              <HorizontalWrapper width="100%" height="100%">
                <SideNavigation cart={(cart && cart.length) || 0} />
                <MainContainer>
                  <VerticalWrapper>
                    <FilterBar
                      currentActive={currentProductType as string}
                      onItemClick={onFilterItemClick}
                    />
                    <Products
                      client={client}
                      activeProductType={currentProductType}
                      limitPerPage={10}
                    />
                  </VerticalWrapper>
                </MainContainer>
              </HorizontalWrapper>
            </PageContainer>
          )}
        </AppContext.Consumer>
      )}
    </ApolloConsumer>
  );
}

export default withRouter(ShopPage);
