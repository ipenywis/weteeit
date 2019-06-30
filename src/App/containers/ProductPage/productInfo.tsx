import React, { useState } from "react";
import styled from "styled-components/macro";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { Divider } from "../../components/divider";
import { SizeSelector } from "../../components/sizeSelector";
import { ColorSelector } from "../../components/colorSelector";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { Button } from "../../components/button";
import { NumericInput } from "../../components/numericInput";
import { withRouter } from "react-router-dom";

export interface IProductInfoProps {
  name: string;
  price: number;
}

const ProductInfoContainer = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding: 0 12%;
`;

const Name = styled.div`
  font-size: 40px;
  color: #3d3d3d;
  font-weight: 700;
`;

const MutedText = styled.div`
  color: rgba(15, 15, 15, 0.2);
  font-size: 24px;
  font-style: italic;
  font-weight: 600;
  margin-left: 5px;
`;

const Price = styled.div`
  font-size: 60px;
  color: #3d3d3d;
  font-weight: 800;
`;

const QuantityContainer = styled(HorizontalWrapper)`
  width: 100%;
  margin-top: 2em;
`;

function ProductInfo(props: IProductInfoProps) {
  const { name, price } = props;
  const currency = "DZD";
  //Size State
  const [size, updateSize] = useState("M");
  //Color State
  const [color, updateColor] = useState("black");
  //Quantity State
  const [quantity, updateQuantity] = useState("1");

  return (
    <ProductInfoContainer>
      <Name>{name}</Name>
      <MutedText>By Weteeit</MutedText>
      <Divider direction="horizontal" />
      <MutedText>Price</MutedText>
      <Price>
        {price} {currency}
      </Price>
      <Divider />
      <MutedText>Sizes</MutedText>
      <SizeSelector selected={size} onSelect={updateSize} />
      <Divider />
      <MutedText>Colors</MutedText>
      <ColorSelector
        selected={color}
        onSelect={colorName => {
          updateColor(colorName);
        }}
      />
      <Divider />
      <QuantityContainer width="100%" spaceEvenly>
        <NumericInput
          value={quantity}
          onChange={e =>
            parseInt(e.target.value) >= 1 && updateQuantity(e.target.value)
          }
        />
        <Button large={true}>Add to Cart</Button>
      </QuantityContainer>
    </ProductInfoContainer>
  );
}

export default withRouter(ProductInfo as any);
