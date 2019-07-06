import React from "react";
import styled from "styled-components";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { IShowcaseItem, FakeShowcaseItems } from "./constants";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";
import { GET_PRODUCTS } from "./queries";
import { GetProducts_products } from "../../typings/graphql-types";
import { withRouter } from "react-router-dom";
import { Filters, IFilterItem } from "../../components/filterBar/constants";
import { FilterBar } from "../../components/filterBar";
import productsService from "../../services/products.service";
import { Location, History } from "history";
import { ErrorWrapper } from "../../components/error";

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
  history?: History;
  location?: Location;
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

  onFilterItemClick(itemKey: string, item: IFilterItem) {
    this.setAsActiveItem(itemKey);
    //TODO: Support other filter appliers | only supports query for now
    this.props.history && this.props.history.push(`/shop?type=${item.query}`);
  }

  showcaseProduct(product: GetProducts_products) {
    this.props.history && this.props.history.push(`/shop/${product.name}`);
  }

  componentDidMount() {
    //set type by default onmount
    this.props.history &&
      this.props.history.replace(`/shop?type=${Filters.tshirts.query}`);
    //this.props.history &&
    //this.props.history.push(`/shop/${Filters.tshirts.query}`);
  }

  render() {
    const { currentActive, showcaseItems } = this.state;
    const { location } = this.props;
    const queryParams = new URLSearchParams(location && location.search);
    const productType = queryParams.get("type");
    return (
      <ProductsContainer>
        <VerticalWrapper>
          <FilterBar
            currentActive={currentActive}
            onItemClick={this.onFilterItemClick.bind(this)}
          />
          <ShowcaseContainer>
            <Query query={GET_PRODUCTS} variables={{ type: productType }}>
              {(props: QueryResult) => {
                if (props.loading) return <div>Loading...</div>;
                if (props.error) {
                  console.error(props.error);
                  return (
                    <ErrorWrapper
                      message={props.error.graphQLErrors[0].message}
                    />
                  );
                }
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
