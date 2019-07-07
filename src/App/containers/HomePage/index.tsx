import React from "react";
import styled from "styled-components/macro";
import { PageContainer } from "../../components/pageContainer";
import { BorderButton } from "../../components/borderButton";
import { BrandLogo } from "../../components/brandLogo";

import BackgroundImage from "../../../assets/images/home_background.png";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { Social } from "../../components/social";

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

export default class HomePage extends React.Component {
  render() {
    return (
      <PageContainer>
        <HomePageContainer>
          <BrandLogo size="xxl" style={{ marginTop: "4.5em" }} />
          <HorizontalWrapper>
            <CustomBorderButton large={true} uppercase={true} to="/shop">
              Shop
            </CustomBorderButton>
            <CustomBorderButton large={true} uppercase={true}>
              Submit Your Design
            </CustomBorderButton>
          </HorizontalWrapper>
          <Social />
        </HomePageContainer>
      </PageContainer>
    );
  }
}
