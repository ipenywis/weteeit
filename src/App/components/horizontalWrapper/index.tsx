import * as React from "react";
import styled from "styled-components/macro";

interface IHorizontalWrapperProps {
  width?: string;
  height?: string;
  spaceBetween?: boolean;
  spaceEvenly?: boolean;
  children?: any[] | any;
}

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }: IHorizontalWrapperProps) => (width ? width : "auto")};
  height: ${({ height }: IHorizontalWrapperProps) =>
    height ? height : "auto"};
  justify-content: ${props =>
    (props.spaceBetween && "space-between") ||
    (props.spaceEvenly && "space-evenly")};
`;

export function HorizontalWrapper(props: IHorizontalWrapperProps) {
  return <HorizontalContainer {...props}>{props.children}</HorizontalContainer>;
}
