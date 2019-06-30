import React from "react";
import styled from "styled-components/macro";
import { BrandLogo } from "../brandLogo";
import { NavMenu } from "./navMenu";
import { Cart } from "../cart";
import { HorizontalWrapper } from "../horizontalWrapper";
import { Search } from "../search";
import { VerticalWrapper } from "../verticalWrapper";
import { Link } from "react-router-dom";
import { Social } from "../social";

const SideNavContainer = styled.div`
  width: 17%;
  background-color: #3d3d3d;
  padding: 20px;
  min-width: 13em;
  position: relative;
  overflow: hidden;
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

export interface ISideNavigationProps {
  cart?: number;
}

export function SideNavigation(props: ISideNavigationProps) {
  const { cart } = props;

  return (
    <SideNavContainer>
      <TopNotch />
      <InnerContainer>
        <TopSection>
          <BrandLogo size="lg" diagnol={true} />
          <MiscWrapper>
            <Search />
            <Cart count={cart || 0} />
          </MiscWrapper>
        </TopSection>
        <MiddleSection>
          <NavMenu activeItem={"shop"} />
        </MiddleSection>
        <BottomSection>
          <Social />
          <Copyright to="/about">Copyright @ 2019 Weteeit</Copyright>
        </BottomSection>
      </InnerContainer>
      <BottomNotch />
    </SideNavContainer>
  );
}
