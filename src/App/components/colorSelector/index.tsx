import React from "react";
import styled, { css } from "styled-components/macro";
import { DEFAULT_COLORS } from "./constants";

export interface IColorSelectorProps {
  selected: string;
  //The Actual Color name will be passed-in as parameter
  onSelect: (color: string) => void;
}

const ColorSelectorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 12em;
`;

interface IColorProps {
  color: string;
  selected: string;
}

const Color = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: ${(props: IColorProps) => props.color};
  border: 1px solid #3d3d3d;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  ${props =>
    props.selected === props.color &&
    css`
      box-shadow: 0px 0px 10px 2px rgba(15, 15, 15, 0.2) inset;
      background-color: #3498db;
    `};

  &:hover {
    background-color: #3498db;
  }
`;

export function ColorSelector(props: IColorSelectorProps) {
  const { selected, onSelect } = props;
  const colorValues = Object.values(DEFAULT_COLORS);
  return (
    <ColorSelectorContainer>
      <InnerContainer>
        {colorValues.map((color, idx) => {
          //Get color name (key of the actual color value)
          const colorName = Object.keys(DEFAULT_COLORS).find(
            key => DEFAULT_COLORS[key] === color
          );
          return (
            <Color
              key={`${color}-${idx}`}
              color={colorName as string}
              selected={selected}
              onClick={() => onSelect(colorName as string)}
            />
          );
        })}
      </InnerContainer>
    </ColorSelectorContainer>
  );
}
