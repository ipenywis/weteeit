import React from "react";
import styled from "styled-components";
import { IInputError } from "../../typings/common";
import { VerticalWrapper } from "../verticalWrapper";
import { device } from "../../../style/responsive";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: IInputError;
}

interface IInputContainerProps {
  isError?: boolean;
}

const Wrapper = styled(VerticalWrapper)`
  width: 100%;
  &:last-of-type {
    margin-left: 8px;
  }

  @media ${device.mobile} {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;

const InputContainer = styled.input`
  outline: none;
  border: ${({ isError }: IInputContainerProps) =>
    isError ? "1px solid #e74c3c" : "1px solid #79787857"};
  border-radius: 8px;
  min-height: 3em;
  width: 100%;
  font-size: 20px;
  margin-right: 1em;
  margin-top: 0.7em;
  padding: 0 20px;
  min-height: 3.5em;
  color: #3d3d3d;
  transition: all 250ms ease-in-out;

  &:last-of-type {
    margin-right: 0;
  }

  &::placeholder {
    color: #79787857;
    font-weight: 800;
  }

  @media ${device.mobile} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const InputError = styled.span`
  margin-top: 7px;
  color: #e74c3c;
  font-size: 15px;
  font-weight: 600;
  padding: 0 7px;
  text-align: start;
`;

export default function Input(props: IInputProps) {
  const { errors, name } = props;

  const isError = errors && name && errors[name] && errors[name] !== "";
  const error = errors && name && errors[name];

  if (isError && error && name)
    return (
      <Wrapper>
        <InputContainer {...props} isError={true} />
        <InputError>{error}</InputError>
      </Wrapper>
    );
  else
    return (
      <Wrapper>
        <InputContainer {...props} isError={false} />
      </Wrapper>
    );
}
