import React from "react";
import styled from "styled-components";

export const CancelOrder = styled.div`
  position: absolute;
  top: 0.9em;
  right: 1.5em;
  color: #3d3d3d;
  cursor: pointer;

  svg {
    transition: filter 200ms ease-in-out;
    &:hover {
      filter: contrast(0.3);
    }
  }
`;
