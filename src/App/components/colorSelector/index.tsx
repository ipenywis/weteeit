import React from "react";
import styled, { css } from "styled-components/macro";
import { DEFAULT_COLORS } from "./constants";
import { VerticalWrapper } from "../verticalWrapper";
import { Dropdown } from "../dropdown";
import { IAppContextProps } from "../../app.context";

export interface IColorSelectorProps {
  selected: string;
  showSelectedColorName?: boolean;
  //The Actual Color name will be passed-in as parameter
  onSelect: (color: string) => void;
}

const ColorSelectorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const ColorName = styled.div`
  font-size: 16px;
  color: #3d3d3d;
  margin-top: 1em;
  font-weight: 600;
`;

function ColorSelector(props: IColorSelectorProps) {
  const { selected, onSelect, showSelectedColorName } = props;
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
            <VerticalWrapper>
              <Color
                key={`${color}-${idx}`}
                color={colorName as string}
                selected={selected}
                onClick={() => onSelect(colorName as string)}
              />
            </VerticalWrapper>
          );
        })}
      </InnerContainer>
      {showSelectedColorName && <ColorName>{selected}</ColorName>}
    </ColorSelectorContainer>
  );
}

ColorSelector.defaultProps = {
  showSelectedColorName: true
};

function ColorDropdown(props: Partial<IColorSelectorProps>) {
  const colors = Object.keys(DEFAULT_COLORS);

  const onColorSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    color: string
  ) => {
    props.onSelect && props.onSelect(color);
  };

  return (
    <Dropdown
      options={colors}
      onSelect={onColorSelect}
      selected={props.selected}
    />
  );
}

export { ColorSelector, ColorDropdown };
