import React from "react";
import styled from "styled-components";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { IShowcaseItem, FakeShowcaseItems } from "./constants";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_PRODUCTS } from "./queries";
import { GetProducts_products } from "../../typings/graphql-types";
import { withRouter } from "react-router-dom";
import { Filters } from "../../components/filterBar/constants";
import { FilterBar } from "../../components/filterBar";
import productsService from "../../services/products.service";

const ProductsContainer = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const ShowcaseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ShowcaseItem = styled.div`
  flex-basis: 23em;
  max-height: 23em;
  transition-property: filter;
  transition: 350ms ease-in-out;
  cursor: pointer;

  img {
    width: 100%;
    height: 100;
  }

  &:hover {
    filter: brightness(0.8) contrast(0.9);
  }
`;

export interface IProductsProps {
  history?: any;
}

export interface IProductsState {
  currentActive: string;
  showcaseItems: IShowcaseItem[];
}

class Products extends React.Component<IProductsProps, IProductsState> {
  state: IProductsState;

  constructor(props: IProductsProps) {
    super(props);

    this.state = {
      currentActive: Filters.tshirts.name,
      showcaseItems: []
    };
  }

  componentWillMount() {
    //TODO: Add Server Data Fetching here, fake data is used for now!
    const fakeShowcaseItems = Object.values(FakeShowcaseItems);
    this.setState({ showcaseItems: fakeShowcaseItems });
    //Clear Stored products
    productsService.clearLoadedProducts();
  }

  setAsActiveItem(itemKey: string) {
    this.setState({ currentActive: itemKey || Filters.tshirts.name });
  }

  showcaseProduct(product: GetProducts_products) {
    this.props.history.push(`/shop/${product.name}`);
  }

  render() {
    const { currentActive, showcaseItems } = this.state;

    return (
      <ProductsContainer>
        <VerticalWrapper>
          <FilterBar
            currentActive={currentActive}
            onItemClick={this.setAsActiveItem.bind(this)}
          />
          <ShowcaseContainer>
            <Query query={GET_PRODUCTS}>
              {(props: any) => {
                if (props.loading) return <div>Loading...</div>;
                if (props.error) return <div>Error...</div>;
                return props.data.products.map(
                  (item: GetProducts_products, idx: number) => {
                    //Store Loaded Products
                    productsService.addLoadedProduct(item);
                    return (
                      <ShowcaseItem
                        key={`${item.name}-${idx}`}
                        onClick={() => this.showcaseProduct(item)}
                      >
                        <img src={item.imageUrl} alt="" />
                      </ShowcaseItem>
                    );
                  }
                );
              }}
            </Query>
          </ShowcaseContainer>
        </VerticalWrapper>
      </ProductsContainer>
    );
  }
}

export default withRouter(Products as any);
