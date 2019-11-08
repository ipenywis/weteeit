import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { SideNavigation } from "../../components/sideNavigation";
import { AppContext } from "../../app.context";
import styled from "styled-components";
import { BrandLogo } from "../../components/brandLogo";
import { useMediaQuery } from "react-responsive";
import { size } from "../../../style/responsive";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faPhoneAlt,
  faIdBadge
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled(BrandLogo)`
  margin-top: 3em;
`;

const AboutContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
`;

const TextContainer = styled(VerticalWrapper)`
  align-items: center;
`;

const Header = styled.div`
  width: fit-content;
  font-size: 28px;
  font-weight: 800;
  color: rgba(15, 15, 15, 0.8);
  border-bottom: 3px solid rgba(15, 15, 15, 0.7);
  padding: 2px 5px;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const SpecialHeader = styled(Header)`
  color: #f1c40f;
  border-color: #f1c40f;
`;

const Text = styled.div`
  width: fit-content;
  font-size: 19px;
  color: rgba(15, 15, 15, 0.6);
  line-height: 2;
  font-weight: 600;
`;

const SpecialText = styled(Text)`
  font-size: 21px;
  color: rgba(15, 15, 15, 1);
  font-weight: 600;
  transition: all, 250ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #3498db;
    svg {
      color: #3498db;
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 9px;
  color: rgba(15, 15, 15, 0.6);
  transition: all, 250ms ease-in-out;
`;

const Link = styled.a``;

export default function AboutPage(props: any) {
  const isMobile = useMediaQuery({ maxWidth: size.mobileMinWidth });

  return (
    <AppContext.Consumer>
      {({ cart }) => (
        <PageContainer>
          <HorizontalWrapper width="100%" height="100%">
            <SideNavigation cart={(cart && cart.length) || 0} />
            <MainContainer>
              <Logo color="black" size="xxl" diagnol />
              <AboutContainer>
                <Header>About Us</Header>
                <TextContainer>
                  <Text>
                    Weteeit is a Clothing Shop with awesome Tshirt Designs and
                    outstanding build quality.
                  </Text>
                  <Text>We offer new Exlusive Designs every month.</Text>
                  <Text>نبدع من اجلكم</Text>
                  <Text>We Create For you</Text>
                </TextContainer>
                <Header>Contact Us</Header>
                <VerticalWrapper>
                  <SpecialText>
                    <Icon icon={faPhoneAlt} />
                    Call 0794 06 34 73
                  </SpecialText>
                  <SpecialText>
                    <Icon icon={faFacebookMessenger} />
                    <Link href="https://m.me/weteeit" target="_blank">
                      Reach us on Messenger
                    </Link>
                  </SpecialText>
                </VerticalWrapper>
                <Header>Developer</Header>

                <SpecialText>
                  <Link href="https://github.com/ipenywis">
                    Developed with ☕ and ❤️ By <Link>Ipenywis Team</Link>
                  </Link>
                </SpecialText>
                <SpecialText>
                  <Link href="mailto:ipenywis@gmail.com">
                    <Icon icon={faIdBadge} /> Contact: ipenywis@gmail.com
                  </Link>
                </SpecialText>
              </AboutContainer>
            </MainContainer>
          </HorizontalWrapper>
        </PageContainer>
      )}
    </AppContext.Consumer>
  );
}
