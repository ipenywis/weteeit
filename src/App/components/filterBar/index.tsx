import React from "react";
import styled from "styled-components";
import { Filters, IFilterItem } from "./constants";
import { device } from "../../../style/responsive";

export interface IFilterBarProps {
  currentActive: string;
  onItemClick: (itemKey: string, item: IFilterItem) => void;
}

const FiltersContainer = styled.div`
  width: 100%;
  height: 6.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px 2em;
  flex-wrap: wrap;

  @media ${device.mobile} {
    height: auto;
    margin: 1em 0 1em 0;
  }
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
  font-size: 27px;
  font-weight: 700;
  cursor: pointer;
  transition: color 260ms ease-in-out;

  @media ${device.mobile} {
    font-size: 19px;
  }
`;

export function FilterBar(props: IFilterBarProps) {
  const filterItems = Object.keys(Filters);

  return (
    <FiltersContainer>
      {filterItems.map((itemKey, idx) => {
        const item = Filters[itemKey];
        return (
          <FilterItem
            key={`${itemKey}-${idx}`}
            currentItem={itemKey}
            currentActive={props.currentActive}
            onClick={() => props.onItemClick(itemKey, item)}
          >
            {item.name}
          </FilterItem>
        );
      })}
    </FiltersContainer>
  );
}
