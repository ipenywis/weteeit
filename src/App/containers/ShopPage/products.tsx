import React from "react";
import styled from "styled-components";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { IShowcaseItem } from "./constants";
import { GET_PRODUCTS } from "./queries";
import { withRouter, match } from "react-router-dom";
import { Location, History } from "history";
import { ErrorWrapper } from "../../components/error";
import { Pagination } from "./pagination";
import { ApolloClient } from "apollo-boost";
import { IProduct } from "../../typings/product";
import { IPagination } from "../../typings/pagination";
import { randomTimeKey } from "../../../utils/common";
import { device } from "../../../style/responsive";

const ProductsContainer = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const ShowcaseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media ${device.mobile} {
    justify-content: center;
  }
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

  @media ${device.mobile} {
    flex-basis: 11em;
  }
`;

export interface IProductsProps {
  history: History;
  location: Location;
  client: ApolloClient<any>;
  match: match;
  activeProductType: string | null;
  limitPerPage?: number;
}

export interface IProductsState {
  showcaseItems: IShowcaseItem[];
  errors: string[];
  isLoading: boolean;
  products: IProduct[];
  pagination: IPagination | null;
  pageId: number;
}

class Products extends React.Component<IProductsProps, IProductsState> {
  state: IProductsState;

  constructor(props: IProductsProps) {
    super(props);

    this.state = {
      showcaseItems: [],
      isLoading: false,
      errors: [],
      products: [],
      pagination: null,
      pageId: 1
    };
  }

  getProductTypeFromQuery(): string | null {
    const queryParams = new URLSearchParams(
      this.props.location && this.props.location.search
    );
    return queryParams.get("type");
  }

  showcaseProduct(product: IProduct) {
    this.props.history && this.props.history.push(`/shop/${product.name}`);
  }

  clearErrors() {
    this.setState({ errors: [] });
  }

  async fetchProductsWithPagination() {
    //Clear All Erros Before
    this.clearErrors();

    const { client, activeProductType, limitPerPage } = this.props;
    const { pageId } = this.state;
    let isError = false;

    if (!activeProductType || activeProductType === "") {
      this.setState({ errors: ["Please Select a Product Type!!"] });
      return false;
    }

    const response = await client
      .query({
        query: GET_PRODUCTS,
        variables: {
          type: activeProductType,
          pageId: pageId,
          limitPerPage: limitPerPage || 20
        }
      })
      .catch(err => {
        isError = true;
        if (err.graphQLErrors)
          this.setState({
            errors: err.graphQLErrors.map((e: any) => {
              if (typeof e.message === "string") return e.message;
              else if (typeof e.message === "object")
                return (e.message as any).message;
            })
          });
        else
          this.setState({ errors: ["Error Loading Data, Please Try Again!"] });
      });

    if (!isError && response && response.loading)
      this.setState({ isLoading: response.loading });
    else if (
      !isError &&
      (response &&
        response.data &&
        response.data.productsWithPagination.products)
    ) {
      const productsWithPagination =
        response && response.data.productsWithPagination;
      if (productsWithPagination && productsWithPagination.products) {
        this.setState({
          products: productsWithPagination.products,
          pagination: productsWithPagination.pagination
        });
      }
    } else if (!response && !isError) {
      this.setState({ errors: ["Error Loading Products"] });
    }
  }

  async componentWillMount() {
    //Set Default Page
    this.setPageIdFromQueryOrDefault();
    await this.fetchProductsWithPagination();
  }

  async componentDidUpdate(prevProps: IProductsProps) {
    //Only Run update when type changes
    if (prevProps.activeProductType !== this.props.activeProductType)
      await this.fetchProductsWithPagination();
  }

  private setPageIdFromQueryOrDefault() {
    const { pagination } = this.state;
    const queryParams = new URLSearchParams(
      this.props.location && this.props.location.search
    );
    //return queryParams.get("page");
    const pageId = parseInt(queryParams.get("page") as string);
    if (
      pagination &&
      pagination.numPages &&
      pageId &&
      pageId > 0 &&
      pageId <= pagination.numPages
    )
      this.setPageId(pageId);
    //Default Page id
    else this.setPageId(1);
  }

  private setPageId(id: number) {
    const { location } = this.props;
    const updatedPath =
      location.pathname +
      location.search.replace(/\?page=?.?\d*/, "") +
      `?page=${id}`;
    this.props.history.push(updatedPath);
    this.setState({ pageId: id }, this.fetchProductsWithPagination.bind(this));
  }

  goNext() {
    const { pageId, pagination } = this.state;
    const nextPageId = pageId + 1;
    if (pagination && pagination.numPages && nextPageId <= pagination.numPages)
      this.setPageId(nextPageId);
  }

  goPrevious() {
    const { pageId } = this.state;
    const prevPageId = pageId - 1;
    if (prevPageId > 0) this.setPageId(prevPageId);
  }

  render() {
    const { products, pagination, errors, isLoading } = this.state;
    let isError = errors && errors.length > 0;

    return (
      <ProductsContainer>
        <VerticalWrapper>
          <ShowcaseContainer>
            {!isLoading &&
              !isError &&
              products.map((item: IProduct, idx: number) => {
                return (
                  <ShowcaseItem
                    key={`${item.name}-${idx}`}
                    onClick={() => this.showcaseProduct(item)}
                  >
                    <img src={item.imageUrl} alt="" />
                  </ShowcaseItem>
                );
              })}
            {!isLoading &&
              isError &&
              errors.map(err => {
                return <ErrorWrapper message={err} />;
              })}
            {!isLoading && !isError && (
              <Pagination
                numProducts={pagination && pagination.count}
                pageId={pagination && pagination.pageId}
                perPage={pagination && pagination.perPage}
                numPages={pagination && pagination.numPages}
                onGoNext={this.goNext.bind(this)}
                onGoPrevious={this.goPrevious.bind(this)}
              />
            )}
          </ShowcaseContainer>
        </VerticalWrapper>
      </ProductsContainer>
    );
  }
}

export default withRouter<IProductsProps>(Products);
