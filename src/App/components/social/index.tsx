import React from "react";
import styled from "styled-components/macro";
import { socialMedia } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 8.4em;
  margin-bottom: 2em;
`;

const SocialIcon = styled.a`
  background-color: #fff;
  border-radius: 50%;
  color: #505050;
  width: 29px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: border, background-color;
  transition: 250ms ease-in-out;

  &:hover {
    color: #fff;
    background-color: transparent;
  }
`;

export interface ISocialProps {}

export function Social(props: ISocialProps) {
  const socialMediaVals = Object.values(socialMedia);
  return (
    <SocialContainer>
      {socialMediaVals.map(({ link, icon }, idx) => {
        return (
          <SocialIcon key={`${link}-${idx}`} href={link}>
            <FontAwesomeIcon icon={icon} size="sm" />
          </SocialIcon>
        );
      })}
    </SocialContainer>
  );
}
