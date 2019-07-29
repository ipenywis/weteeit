import React from "react";
import styled from "styled-components/macro";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { FilterBar } from "../../components/filterBar";
import { Filters, IFilterItem } from "../../components/filterBar/constants";
import { Query } from "react-apollo";
import { IProduct } from "../../typings/product";
import { GET_PRODUCT } from "./queries";
import ProductInfo from "./productInfo";
import { ErrorWrapper } from "../../components/error";
import messages from "./messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { AppContext, IAppContextProps } from "../../app.context";

export interface IProductProps {
  productName: string;
  history: History;
}

const ProductContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
`;

const UpperContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: 0 15px;

  svg {
    transition: transform 400ms ease-in-out;
  }

  svg:hover {
    transform: translateX(-3px);
    cursor: pointer;
  }
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
  flex-basis: 100%;
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

class Product extends React.Component<IProductProps, IProductState> {
  state: IProductState;

  constructor(props: IProductProps) {
    super(props);
    this.state = {
      currentActive: Filters.tshirt.name
    };
  }
  setAsActiveItem(itemKey: string) {
    this.setState({ currentActive: itemKey || Filters.tshirt.name });
  }

  onFilterItemClick(itemKey: string, item: IFilterItem) {
    this.setAsActiveItem(itemKey);
    //TODO: Support other filter appliers | only supports query for now
    this.props.history && this.props.history.push(`/shop?type=${item.query}`);
  }

  onGoBackClick() {
    const { history } = this.props;
    history.goBack();
  }

  renderLeftSide(
    product: IProduct,
    cart: IAppContextProps["cart"],
    setCart: IAppContextProps["setCart"]
  ) {
    return (
      <LeftContainer>
        <ProductInfo {...product} setCart={setCart} cart={cart} />
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

    return (
      <AppContext.Consumer>
        {({ cart, setCart }) => {
          return (
            <ProductContainer>
              <VerticalWrapper width="100%" height="100%">
                <FilterBar
                  currentActive={currentActive}
                  onItemClick={this.onFilterItemClick.bind(this)}
                />
                <UpperContainer>
                  <div onClick={this.onGoBackClick.bind(this)}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                  </div>
                </UpperContainer>
                <InnerContainer>
                  <Query query={GET_PRODUCT} variables={{ name: productName }}>
                    {(props: any) => {
                      if (props.loading) return <div>Loading...</div>;
                      if (props.error) {
                        return (
                          <ErrorWrapper
                            message={messages.errorLoadingProduct}
                          />
                        );
                      }
                      const item = props.data.product as IProduct;
                      return (
                        <InnerContainer>
                          {this.renderLeftSide(item, cart, setCart)}
                          {this.renderRightSide(item)}
                        </InnerContainer>
                      );
                    }}
                  </Query>
                </InnerContainer>
              </VerticalWrapper>
            </ProductContainer>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default withRouter<any>(Product as any);
