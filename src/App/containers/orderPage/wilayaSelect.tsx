import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { GET_SHIPPINGS } from "./queries";
import { ApolloCurrentQueryResult } from "apollo-boost";
import { IShipping } from "../../typings/shipping";
import { VerticalWrapper } from "../../components/verticalWrapper";

export interface IWilayaSelectProps {
  value?: string;
  error?: string;

  onSelect?: (wilaya: string) => void;
}

interface IContainerProps {
  isError: boolean;
}

const WilayaSelectContainer = styled.select`
  outline: none;
  border: ${({ isError }: IContainerProps) =>
    isError ? "1px solid #e74c3c" : "1px solid #79787857"};
  border-radius: 8px;
  min-height: 3em;
  width: 100%;
  height: fit-content;
  font-size: 20px;
  font-weight: 800;
  margin-right: 1em;
  margin-top: 0.7em;
  padding: 0 20px;
  min-height: 3.5em;
  color: #3d3d3d;
  background-color: #fff;
`;

const SelectError = styled.span`
  margin-top: 7px;
  color: #e74c3c;
  font-size: 15px;
  font-weight: 600;
  padding: 0 7px;
  text-align: start;
`;

const Wrapper = styled(VerticalWrapper)`
  width: 100%;
  &:last-of-type {
    margin-left: 8px;
  }
`;

export default function WilayaSelect(props: IWilayaSelectProps) {
  const defaultValue = "Choose a Wilaya";

  return (
    <Wrapper>
      <WilayaSelectContainer
        value={
          props.value === "" || props.value === null
            ? defaultValue
            : props.value
        }
        onChange={e =>
          props.onSelect &&
          props.onSelect(
            e.currentTarget.value === defaultValue ? "" : e.currentTarget.value
          )
        }
        isError={props.error !== "" && props.error !== undefined}
      >
        <Query query={GET_SHIPPINGS}>
          {(
            queryProps: ApolloCurrentQueryResult<{ shippings: IShipping[] }>
          ) => {
            if (queryProps.loading) return <option>Loading...</option>;
            if (queryProps.error) return <option>Error Loading Data</option>;

            const shippings = queryProps.data && queryProps.data.shippings;
            if (shippings && shippings.length > 0)
              return (
                <>
                  <option>{defaultValue}</option>
                  {shippings.map((shipping, idx) => {
                    return (
                      <option key={`${shipping.wilaya}-${idx}`}>
                        {shipping.wilaya}({shipping.price})
                      </option>
                    );
                  })}
                </>
              );
            else return <option>No Shipping Method Exists</option>;
          }}
        </Query>
      </WilayaSelectContainer>
      {props.error && <SelectError>{props.error}</SelectError>}
    </Wrapper>
  );
}
