import React from "react";
import styled from "styled-components";

export interface IErrorProps {
  message: string;
}

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 21px;
`;

const ErrorText = styled.div`
  font-size: 28px;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 25px;
`;
const ErrorMessage = styled.div`
  font-size: 23px;
  color: #d3d3d3;
  font-weight: lighter;
`;

export function ErrorWrapper(props: IErrorProps) {
  return (
    <ErrorContainer>
      <ErrorText>Error !</ErrorText>
      <ErrorMessage>{props.message}</ErrorMessage>
    </ErrorContainer>
  );
}
