import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

export interface IPaginationProps {
  pageId: number;
  numPages: number;
  perPage: number;

  onGoNext: () => void;
  onGoPrevious: () => void;
}

const PaginationContainer = styled.div`
  width: 100%;
  padding: 3em 25px;
  display: flex;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

interface INavigatorProps {
  active?: boolean;
}

const Navigator = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 600;
  color: ${(props: INavigatorProps) =>
    props.active ? "#3d3d3d" : "rgba(15, 15, 15, 0.5)"};
  cursor: ${(props: INavigatorProps) =>
    props.active ? "pointer" : "not-allowed"};
  line-height: 1;
  transition: filter 180ms ease-in-out;
  ${(props: INavigatorProps) =>
    props.active &&
    css`
      &:hover {
        filter: contrast(0.3);
      }
    `};

  svg {
    margin: 0 1em;
  }
`;

const PageInfo = styled.div`
  font-size: 20px;
  color: #3d3d3d;
  font-weight: 600;
`;

interface IPaginationState {
  count: number;
}

export class Pagination extends React.Component<IPaginationProps> {
  state: IPaginationState;

  constructor(props: IPaginationProps) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    const { numPages, perPage, pageId } = this.props;
    const { count } = this.state;
    const numProducts = numPages && perPage ? perPage * numPages : 0;
    const isPreviousActive = pageId - 1 > 0;
    const isNextActive = pageId + 1 <= numPages;

    const onPreviousClick = () => {
      if (isPreviousActive) {
        this.setState({ count: count - perPage });
        this.props.onGoPrevious();
      }
    };

    const onNextClick = () => {
      if (isNextActive) {
        this.setState({ count: count + perPage });
        this.props.onGoNext();
      }
    };

    return (
      <PaginationContainer>
        <InnerContainer>
          <Navigator active={isPreviousActive} onClick={onPreviousClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <div>Previous</div>
          </Navigator>
          <PageInfo>
            Showing {count === 0 ? 1 : count}-{count + perPage} of {numProducts}{" "}
            awesome products
          </PageInfo>
          <Navigator active={isNextActive} onClick={onNextClick}>
            <div>Next</div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Navigator>
        </InnerContainer>
      </PaginationContainer>
    );
  }
}
