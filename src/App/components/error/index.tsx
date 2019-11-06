import React from "react";
import styled from "styled-components";
import { device } from "../../../style/responsive";

export interface IErrorProps {
  message: string | any;
  small?: boolean;
}

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ small }: IErrorProps) => (small ? "" : "100%")};
  height: ${({ small }: IErrorProps) => (small ? "" : "100%")};
  justify-content: center;
  align-items: center;
  margin-top: ${({ small }: IErrorProps) => (small ? "19px" : "21px")};
  margin-bottom: 10px;
`;

const ErrorText = styled.div`
  font-size: ${({ small }: IErrorProps) => (small ? "25px" : "28px")};
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: ${({ small }: IErrorProps) => (small ? "10px" : "25px")};

  @media ${device.mobile} {
    font-size: 23px;
  }
`;
const ErrorMessage = styled.div`
  font-size: ${({ small }: IErrorProps) => (small ? "19px" : "23px")};
  color: #d3d3d3;
  font-weight: lighter;

  @media ${device.mobile} {
    font-size: 19px;
  }
`;

export function ErrorWrapper(props: IErrorProps) {
  let message = "Error!";
  if (typeof props.message === "object") {
    if (props.message.statusCode && props.message.statusCode === 404)
      message = "Data Not Found, Please try again later!";
  } else {
    message = props.message;
  }

  return (
    <ErrorContainer {...props}>
      <ErrorText {...props}>Error !</ErrorText>
      <ErrorMessage {...props}>{message}</ErrorMessage>
    </ErrorContainer>
  );
}
