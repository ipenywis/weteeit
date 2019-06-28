export interface IFilters {
  [key: string]: IFilterItem;
}

export interface IFilterItem {
  name: string;
  filter?: (name: string) => void;
  query?: string;
}

export const Filters: IFilters = {
  tshirts: {
    name: "Tshirts",
    filter: name => {}
  },
  Sweatshirts: {
    name: "Tshirts",
    filter: name => {}
  },
  Hoodies: {
    name: "Tshirts",
    filter: name => {}
  },
  Posters: {
    name: "Tshirts",
    filter: name => {}
  },
  Mugs: {
    name: "Tshirts",
    filter: name => {}
  },
  Pillows: {
    name: "Tshirts",
    filter: name => {}
  }
};
