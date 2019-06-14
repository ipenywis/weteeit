import React from "react";
import styled from "styled-components";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { Filters, test, IShowcaseItem, FakeShowcaseItems } from "./constants";
import { HorizontalWrapper } from "../../components/horizontalWrapper";

const ProductsContainer = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const FiltersContainer = styled.div`
  width: 100%;
  height: 5em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px 2em;
`;

interface IFilterItemProps {
  currentItem: string;
  currentActive: string;
}

const FilterItem = styled.div`
  color: ${(props: IFilterItemProps) =>
    props.currentItem === props.currentActive
      ? "#000"
      : "rgba(15, 15, 15, 0.2)"};
  font-size: 25px;
  font-weight: 500;
  font-weight: 700;
  cursor: pointer;
  transition: color 260ms ease-in-out;
`;

const ShowcaseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ShowcaseItem = styled.div`
  max-width: 15em;
  max-height: 15em;
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

export interface IProductsProps {}

export interface IProductsState {
  currentActive: string;
  showcaseItems: IShowcaseItem[];
}

export default class Products extends React.Component<
  IProductsProps,
  IProductsState
> {
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
  }

  setAsActiveItem(itemKey: string) {
    this.setState({ currentActive: itemKey || Filters.tshirts.name });
  }

  render() {
    const { currentActive, showcaseItems } = this.state;

    const filterItems = Object.keys(Filters);

    return (
      <ProductsContainer>
        <VerticalWrapper>
          <FiltersContainer>
            {filterItems.map((itemKey, idx) => {
              const item = Filters[itemKey];
              return (
                <FilterItem
                  key={`${itemKey}-${idx}`}
                  currentItem={itemKey}
                  currentActive={currentActive}
                  onClick={() => this.setAsActiveItem(itemKey)}
                >
                  {item.name}
                </FilterItem>
              );
            })}
          </FiltersContainer>
          <ShowcaseContainer>
            {showcaseItems.map((item, idx) => {
              return (
                <ShowcaseItem key={`${item.name}-${idx}`}>
                  <img src={item.imageURL} alt="" />
                </ShowcaseItem>
              );
            })}
          </ShowcaseContainer>
        </VerticalWrapper>
      </ProductsContainer>
    );
  }
}
