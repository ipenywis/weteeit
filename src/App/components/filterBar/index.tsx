import React from "react";
import styled from "styled-components";
import { Filters, IFilterItem } from "./constants";

export interface IFilterBarProps {
  currentActive: string;
  onItemClick: (item: string) => void;
}

const FiltersContainer = styled.div`
  width: 100%;
  height: 6.5em;
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
  font-size: 27px;
  font-weight: 500;
  font-weight: 700;
  cursor: pointer;
  transition: color 260ms ease-in-out;
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
            onClick={() => props.onItemClick(itemKey)}
          >
            {item.name}
          </FilterItem>
        );
      })}
    </FiltersContainer>
  );
}
