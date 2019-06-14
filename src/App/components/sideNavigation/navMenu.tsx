import React from "react";
import styled from "styled-components/macro";
import { menu } from "./constants";
import { Link } from "react-router-dom";

interface IMenuItemProps {
  current: string;
}

export interface INavMenuProps {
  activeItem: string;
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled(Link)`
  font-family: "Open Sans", sans-serif;
  font-size: 24px;
  font-weight: 700;
  height: 1.6em;
  color: ${(props: INavMenuProps & IMenuItemProps) =>
    props.activeItem === props.current ? "#fff" : "#a5a5a5"};
  transition: color 270ms ease-in-out;

  &:hover {
    color: #7b7b7b;
  }
`;

export function NavMenu(props: INavMenuProps) {
  const menuItems = Object.keys(menu);

  return (
    <MenuContainer>
      {menuItems.map((itemKey, idx) => {
        const item = menu[itemKey];
        return (
          <MenuItem
            to={item.path}
            {...props}
            current={itemKey}
            key={`${itemKey}-${idx}`}
          >
            {item.name}
          </MenuItem>
        );
      })}
    </MenuContainer>
  );
}
