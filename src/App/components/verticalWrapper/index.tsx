import * as React from "react";
import styled from "styled-components/macro";

interface IVerticalWrapperProps {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  children?: any[] | any;
}

const VerticalContainer = styled.div`
  width: ${(props: IVerticalWrapperProps) => props.width || "auto"};
  height: ${props => props.height || "auto"};
  display: flex;
  flex-direction: column;
`;

export function VerticalWrapper(props: IVerticalWrapperProps) {
  return <VerticalContainer {...props}>{props.children}</VerticalContainer>;
}
