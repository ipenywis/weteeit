import React from "react";
import styled from "styled-components";

export interface IDividerProps {
  direction?: "vertical" | "horizontal";
  lightColor?: boolean;
}

const DividerContainer = styled.div`
  background-color: ${({ lightColor }: IDividerProps) =>
    lightColor ? "#79787821" : "#79787857"};
  width: ${(props: IDividerProps) =>
    props.direction === "horizontal" ? "100%" : "2px"};
  height: ${(props: IDividerProps) =>
    props.direction === "horizontal" ? "2px" : "100%"};
  margin: ${(props: IDividerProps) =>
    props.direction === "horizontal" ? "15px 0" : "0 10px"};
`;

function Divider(props: IDividerProps) {
  return <DividerContainer {...props} />;
}

Divider.defaultProps = {
  direction: "horizontal"
};

export { Divider };
