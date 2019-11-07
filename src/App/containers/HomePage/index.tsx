import React, { useState } from "react";
import styled from "styled-components/macro";
import { PageContainer } from "../../components/pageContainer";
import { BorderButton } from "../../components/borderButton";
import { BrandLogo } from "../../components/brandLogo";

import BackgroundImage from "../../../assets/images/home_background.png";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { Social } from "../../components/social";
import ReactTooltip from "react-tooltip";
import { DEVELOPER_LINK } from "../../components/sideNavigation/constants";
import { VerticalWrapper } from "../../components/verticalWrapper";

const DevelopedBy = styled.a`
  font-size: 13px;
  font-weight: 500;
  color: #a5a5a5;
  transition: all 250ms ease-in-out;
  margin-top: 4px;
  margin-bottom: 5px;

  &:hover {
    color: #fff;
  }
`;

const HomePageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: url(${BackgroundImage});
  background-color: #000;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const CustomBorderButton = styled(BorderButton)`
  font-size: 30px;
`;

export default function HomePage(props: any) {
  return (
    <PageContainer>
      <HomePageContainer>
        <BrandLogo size="xxl" style={{ marginTop: "4.5em" }} />
        <HorizontalWrapper>
          <CustomBorderButton large={true} uppercase={true} to="/shop">
            Shop
          </CustomBorderButton>
          <CustomBorderButton
            large={true}
            uppercase={true}
            disabled={false}
            data-tip
            data-for="submit-design"
          >
            Submit Your Design
          </CustomBorderButton>
          <ReactTooltip
            id="submit-design"
            className="react-tooltip"
            effect="solid"
            type="light"
            place="top"
          >
            Coming Soon!
          </ReactTooltip>
        </HorizontalWrapper>
        <VerticalWrapper>
          <Social />
          <DevelopedBy href={DEVELOPER_LINK}>
            Developed With ❤️ By Ipenywis Team
          </DevelopedBy>
        </VerticalWrapper>
      </HomePageContainer>
    </PageContainer>
  );
}
