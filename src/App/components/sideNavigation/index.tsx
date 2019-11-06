import React, { useState } from "react";
import styled from "styled-components/macro";
import { BrandLogo } from "../brandLogo";
import { NavMenu } from "./navMenu";
import { Cart } from "../cart";
import { HorizontalWrapper } from "../horizontalWrapper";
import { Search } from "../search";
import { VerticalWrapper } from "../verticalWrapper";
import { Link } from "react-router-dom";
import { Social } from "../social";
import { DEVELOPER_LINK } from "./constants";
import ReactTooltip from "react-tooltip";
import { useMediaQuery } from "react-responsive";
import { size, device } from "../../../style/responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface IResponsiveProps {
  isMobile: boolean;
}

const SideNavContainer = styled.div`
  width: 17%;
  background-color: #3d3d3d;
  padding: 20px;
  min-width: 13em;
  position: relative;
  overflow: hidden;

  @media ${device.mobile} {
    width: 100%;
    height: 100%;
    z-index: 99;
    position: fixed;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiscWrapper = styled(HorizontalWrapper)`
  margin-top: 2em;
  justify-content: space-evenly;
  min-width: 6em;

  @media ${device.mobile} {
    flex-direction: row;
  }
`;

const Notch = styled.div`
  width: 70%;
  height: 8px;
  background-color: #fff;
`;

const TopNotch = styled(Notch)`
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 12px 12px;
`;

const BottomNotch = styled(Notch)`
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px 12px 0 0;
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled(CenteredWrapper)`
  margin-top: 1em;
  flex: 1;
`;

const MiddleSection = styled(CenteredWrapper)`
  flex: 2;
`;

const BottomSection = styled(CenteredWrapper)``;

const Copyright = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: #a5a5a5;
`;

const DevelopedBy = styled.a`
  font-size: 13px;
  font-weight: 500;
  color: #a5a5a5;
  transition: all 250ms ease-in-out;
  margin-top: 2px;

  &:hover {
    color: #fff;
  }
`;

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-bottom: 8px;
`;

const MenuIcon = styled.div`
  left: 15px;
  top: 11px;
  position: absolute;
  svg {
    cursor: pointer;
  }
`;

const CloseIcon = styled.div`
  top: 11px;
  right: 15px;
  position: absolute;
  svg {
    cursor: pointer;
  }
`;

export interface ISideNavigationProps {
  cart?: number;
}

export function SideNavigation(props: ISideNavigationProps) {
  const { cart } = props;

  const isMobile = useMediaQuery({ maxWidth: size.mobileMinWidth });

  const [isOpen, setIsOpen] = useState(false);

  if (isMobile && !isOpen)
    return (
      <MenuContainer>
        <MenuIcon onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </MenuIcon>
      </MenuContainer>
    );

  if (isMobile && isOpen)
    return (
      <SideNavContainer>
        {!isMobile && <TopNotch />}
        {isMobile && (
          <CloseIcon onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} size="2x" color="#fff" />
          </CloseIcon>
        )}
        <InnerContainer>
          <TopSection>
            <BrandLogo size="lg" diagnol={true} />
            <MiscWrapper>
              <Search data-tip data-for="search-tooltip" />
              <ReactTooltip
                id="search-tooltip"
                className="react-tooltip"
                effect="solid"
                type="light"
                place="top"
              >
                Coming Soon!
              </ReactTooltip>
              <Cart count={cart || 0} pathname="/cart" />
            </MiscWrapper>
          </TopSection>
          <MiddleSection>
            <NavMenu activeItem={"shop"} />
          </MiddleSection>
          <BottomSection>
            <Social />
            <Copyright to="/about">Copyright @ 2019 Weteeit</Copyright>
            <DevelopedBy href={DEVELOPER_LINK}>
              Developed By IslemPenywis
            </DevelopedBy>
          </BottomSection>
        </InnerContainer>
        {!isMobile && <BottomNotch />}
      </SideNavContainer>
    );

  return null;
}
