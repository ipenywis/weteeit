import React from "react";
import styled from "styled-components";
import { device } from "../../../style/responsive";

export interface IDropdownProps {
  options: string[];
  selected?: string;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>, option: string) => void;
}

const DropdownContainer = styled.select`
  min-width: 4.6em;
  min-height: 2.6em;
  border: 4px solid #3d3d3d;
  color: #3d3d3d;
  font-size: 25px;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  padding: 14px;
  outline: none;
  margin: 0.6em;
  background-color: #fff;

  @media ${device.mobile} {
    min-width: 1em;
    min-height: 2.6em;
    padding: 5px;
  }
`;

export function Dropdown(props: IDropdownProps) {
  const { options, onSelect, selected } = props;

  return (
    <DropdownContainer onChange={e => onSelect(e, e.target.value)}>
      {options.map((option, idx) => (
        <option
          key={`${option.toString()}-${idx}`}
          selected={option === selected}
        >
          {option}
        </option>
      ))}
    </DropdownContainer>
  );
}
