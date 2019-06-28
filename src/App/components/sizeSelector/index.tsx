import React from "react";
import styled from "styled-components";
import { SIZES } from "./constants";

export interface ISizeSelectorProps {
  selected: string;
  onSelect?: (size: string) => void;
}

interface ISelectorContainerProps extends ISizeSelectorProps {
  current: string;
}

const SelectorContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`;

const SelectorItem = styled.div`
  padding: 5px 15px;
  color: ${(props: ISelectorContainerProps) =>
    props.selected === props.current ? "#fff" : "#3d3d3d"};
  font-size: 18px;
  background-color: ${(props: ISelectorContainerProps) =>
    props.selected === props.current ? "#3D3D3D" : "rgba(169, 169, 169, 0.2)"};
  border-left: 1px solid #3d3d3d;
  &:first-of-type {
    border-right: 1px solid #3d3d3d;
  }
  box-shadow: ${props =>
    props.selected !== props.current &&
    "0px 0px 8px 1px rgba(15, 15, 15, 0.2)"};
  padding: 5px 15px;
  flex: 1;
  max-width: 6em;
  font-weight: 800;
  cursor: pointer;
  transition-property: background-color, color;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: #3d3d3d;
    color: #fff;
    border-left: 1px solid #fff;
  }
`;

export function SizeSelector(props: ISizeSelectorProps) {
  return (
    <SelectorContainer>
      {SIZES.map((size, idx) => (
        <SelectorItem
          key={`${size}-${idx}`}
          current={size}
          selected={props.selected}
          onClick={() => props.onSelect && props.onSelect(size)}
        >
          {size && size.toUpperCase()}
        </SelectorItem>
      ))}
    </SelectorContainer>
  );
}
