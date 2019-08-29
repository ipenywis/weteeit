export interface IMenuItem {
  name: string;
  path: string;
}

export interface IMenu {
  [key: string]: IMenuItem;
}

export const menu: IMenu = {
  home: {
    name: "Home",
    path: "/"
  },
  shop: {
    name: "Shop",
    path: "/shop"
  },
  about: {
    name: "About",
    path: "/about"
  }
};

export const DEVELOPER_LINK = "https://github.com/ipenywis";
