import React from "react";
import styled from "styled-components/macro";
import SearchIcon from "../../../assets/images/search_icon.png";

export interface ISearchProps {}

const SearchContainer = styled.div`
  width: 2.2em;
  height: 2.2em;
  cursor: pointer;
  transition: filter 200ms ease-in-out;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

export function Search(props: ISearchProps) {
  return (
    <SearchContainer {...props}>
      <img src={SearchIcon} alt="" />
    </SearchContainer>
  );
}
