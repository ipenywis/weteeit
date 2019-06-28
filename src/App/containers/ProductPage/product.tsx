import React from "react";
import styled from "styled-components/macro";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { Divider } from "../../components/divider";
import { FilterBar } from "../../components/filterBar";
import { Filters } from "../../components/filterBar/constants";
import productsService from "../../services/products.service";
import { Query } from "react-apollo";
import { GetProducts_products as IProduct } from "../../typings/graphql-types";
import Wrapper from "../../components/wrapper";
import { GET_PRODUCT } from "./queries";
import { ProductInfo } from "./productInfo";
import { ErrorWrapper } from "../../components/error";
import messages from "./messages";

export interface IProductProps {
  productName: string;
}

const ProductContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
`;

const UpperContainer = styled.div`
  width: 100%;
  position: relative;
`;

const InnerContainer = styled(HorizontalWrapper)`
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
`;

const LeftContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const RightContainer = styled.div`
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface IProductState {
  currentActive: string;
}

export class Product extends React.Component<IProductProps, IProductState> {
  state: IProductState;

  constructor(props: IProductProps) {
    super(props);
    this.state = {
      currentActive: Filters.tshirts.name
    };
  }

  setCurrentActiveFilter(itemKey: string) {
    this.setState({ currentActive: itemKey });
  }

  renderLeftSide(product: IProduct) {
    return (
      <LeftContainer>
        <ProductInfo {...product} />
      </LeftContainer>
    );
  }

  renderRightSide(product: IProduct) {
    return (
      <RightContainer>
        <ImageContainer>
          <img src={product.imageUrl} alt="product-img" />
        </ImageContainer>
      </RightContainer>
    );
  }

  render() {
    const { currentActive } = this.state;
    const { productName } = this.props;
    console.log("Product Component Props ", this.props);

    return (
      <ProductContainer>
        <VerticalWrapper width="100%" height="100%">
          <FilterBar
            currentActive={currentActive}
            onItemClick={this.setCurrentActiveFilter.bind(this)}
          />
          <UpperContainer>X</UpperContainer>
          <InnerContainer>
            <Query query={GET_PRODUCT} variables={{ name: productName }}>
              {(props: any) => {
                if (props.loading) return <div>Loading...</div>;
                if (props.error) {
                  console.log("Error loading product: ", props.error);
                  return (
                    <ErrorWrapper message={messages.errorLoadingProduct} />
                  );
                }
                const item = props.data.product as IProduct;
                console.log("Product ", item);
                return (
                  <InnerContainer>
                    {this.renderLeftSide(item)}
                    {this.renderRightSide(item)}
                  </InnerContainer>
                  /*<ShowcaseItem
                        key={`${item.name}-${idx}`}
                        onClick={() => this.showcaseProduct(item)}
                      >
                        <img src={item.imageUrl} alt="" />
                      </ShowcaseItem>*/
                );
              }}
            </Query>
          </InnerContainer>
        </VerticalWrapper>
      </ProductContainer>
    );
  }
}
