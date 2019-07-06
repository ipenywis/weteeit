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
    query: "tshirt"
  },
  Sweatshirts: {
    name: "Sweatshirts",
    query: "sweatshirt"
  },
  Hoodies: {
    name: "Hoodies",
    query: "hoodie"
  },
  Posters: {
    name: "Posters",
    query: "poster"
  },
  Mugs: {
    name: "Mugs",
    query: "mug"
  },
  Pillows: {
    name: "Pillows",
    query: "pillow"
  }
};
