import React from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { device, size } from "../../../style/responsive";
import { useMediaQuery } from "react-responsive";

export interface IPopupProps {
  children: any | any[];
  isOpen: boolean;
  icon?: IconDefinition;
}

const PopupContainer = styled.div`
  position: fixed;
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

  @media ${device.mobile} {
    margin: 0 1.3em;
  }
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

  @media ${device.mobile} {
    font-size: 20px;
  }
`;

export function Popup(props: IPopupProps) {
  const { isOpen, icon } = props;

  const isMobile = useMediaQuery({ maxWidth: size.mobileMinWidth });

  if (!isOpen) return null;

  return (
    <PopupContainer>
      <PopupInnerContainer>
        <IconContainer>
          <FontAwesomeIcon
            icon={icon || faCheckCircle}
            size={isMobile ? "4x" : "6x"}
          />
        </IconContainer>
        <Content>{props.children}</Content>
      </PopupInnerContainer>
    </PopupContainer>
  );
}
