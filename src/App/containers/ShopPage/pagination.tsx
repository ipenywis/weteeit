import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { size, device } from "../../../style/responsive";

export interface IPaginationProps {
  pageId: number | null;
  numPages: number | null;
  perPage: number | null;
  numProducts: number | null;

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

  @media ${device.mobile} {
    font-size: 16px;
  }
`;

interface IPaginationState {
  count: number;
  isNextLastPage: boolean;
}

export class Pagination extends React.Component<IPaginationProps> {
  state: IPaginationState;

  constructor(props: IPaginationProps) {
    super(props);
    this.state = {
      count: 0,
      isNextLastPage: false
    };
  }

  render() {
    const { numPages, perPage, pageId, numProducts } = this.props;
    const { count, isNextLastPage } = this.state;
    const isPreviousActive = pageId ? pageId - 1 > 0 : false;
    const isNextActive = pageId && numPages ? pageId + 1 <= numPages : false;
    const perPageItems =
      perPage && numProducts && perPage > numProducts ? numProducts : perPage;

    const onPreviousClick = () => {
      if (isPreviousActive && perPage) {
        this.setState({ count: count - perPage, isNextLastPage: false });
        this.props.onGoPrevious();
      }
    };

    const onNextClick = () => {
      if (isNextActive && perPageItems) {
        //Check if it is the last page
        if (numProducts && pageId && pageId + 1 === numPages) {
          this.setState((prevState: IPaginationState) => ({
            count: prevState.count + perPageItems,
            isNextLastPage: true
          }));
        } else
          this.setState((prevState: IPaginationState) => ({
            count: prevState.count + perPageItems
          }));
        this.props.onGoNext();
      }
    };

    return (
      <PaginationContainer>
        <InnerContainer>
          <Navigator active={isPreviousActive} onClick={onPreviousClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <MediaQuery maxWidth={size.mobileMinWidth}>
              {matches => !matches && <div>Previous</div>}
            </MediaQuery>
          </Navigator>
          <PageInfo>
            Showing {count === 0 ? 1 : count}-
            {isNextLastPage ? numProducts : count + (perPageItems as number)} of{" "}
            {numProducts} awesome products
          </PageInfo>
          <Navigator active={isNextActive} onClick={onNextClick}>
            <MediaQuery maxWidth={size.mobileMinWidth}>
              {matches => !matches && <div>Next</div>}
            </MediaQuery>{" "}
            <FontAwesomeIcon icon={faChevronRight} />
          </Navigator>
        </InnerContainer>
      </PaginationContainer>
    );
  }
}
