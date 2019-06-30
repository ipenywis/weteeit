import React from "react";
import styled from "styled-components";

export interface INumericInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = styled.input`
  width: 4.6em;
  height: 2.8em;
  border: 4px solid #3d3d3d;
  color: #3d3d3d;
  font-size: 25px;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  padding: 14px;
  outline: none;
`;

export function NumericInput(props: INumericInputProps) {
  return <Input {...props} type="number" />;
}
