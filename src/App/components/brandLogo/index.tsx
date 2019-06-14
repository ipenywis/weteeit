import React from "react";
import styled from "styled-components/macro";
import Logo from "../../../assets/images/logo.png";

export interface IBrandLogoProps {
  diagnol?: boolean;
  style?: React.CSSProperties;
  size?: "xs" | "s" | "lg" | "xl" | "xxl";
}
const BrandLogoContainer = styled.div`
  color: #fff;
  /*width: 7.5em;
  height: 3em;*/
  transform: ${(props: IBrandLogoProps) => props.diagnol && "rotate(-5deg)"};

  width: ${(props: IBrandLogoProps) => {
    let width = "7.5em";

    switch (props.size) {
      case "xs":
        width = "3em";
        break;
      case "s":
        width = "5em";
        break;
      case "lg":
        width = "10em";
        break;
      case "xl":
        width = "13em";
        break;
      case "xxl":
        width = "16em";
        break;
    }
    return width;
  }};

  img {
    width: 100%;
    height: 100%;
  }
`;

function BrandLogo(props: IBrandLogoProps) {
  return (
    <BrandLogoContainer {...props}>
      <img src={Logo} alt="" />
    </BrandLogoContainer>
  );
}

//Default Props
BrandLogo.defaultProps = {
  size: "s"
};

export { BrandLogo };
