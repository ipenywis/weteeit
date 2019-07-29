import React from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export interface IPopupProps {
  children: any | any[];
  isOpen: boolean;
}

const PopupContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(15, 15, 15, 0.3);
  z-index: 99;
`;

const PopupInnerContainer = styled.div`
  min-width: 6%;
  min-height: 7em;
  background-color: #fff;
  display: flex;
  padding: 4%;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  svg {
    color: #3d3d3d;
  }
`;

const Content = styled.div`
  margin-top: 1em;
  font-size: 22px;
  font-weight: 600;
  color: #3d3d3d;
`;

export function Popup(props: IPopupProps) {
  const { isOpen } = props;

  if (!isOpen) return null;

  return (
    <PopupContainer>
      <PopupInnerContainer>
        <IconContainer>
          <FontAwesomeIcon icon={faCheckCircle} size="6x" />
        </IconContainer>
        <Content>{props.children}</Content>
      </PopupInnerContainer>
    </PopupContainer>
  );
}
