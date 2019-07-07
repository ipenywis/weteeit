import React from "react";
import styled from "styled-components";

export interface IDropdownProps {
  options: string[];
  selected?: string;
  onSelect: (
    e: React.SyntheticEvent<HTMLOptionElement>,
    option: string
  ) => void;
}

const DropdownContainer = styled.select`
  width: 4.6em;
  min-height: 2.6em;
  border: 4px solid #3d3d3d;
  color: #3d3d3d;
  font-size: 25px;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  padding: 14px;
  outline: none;
`;

export function Dropdown(props: IDropdownProps) {
  const { options, onSelect } = props;

  return (
    <DropdownContainer>
      {options.map((option, idx) => (
        <option
          key={`${option.toString()}-${idx}`}
          onSelect={e => onSelect(e, option)}
        >
          {option}
        </option>
      ))}
    </DropdownContainer>
  );
}
