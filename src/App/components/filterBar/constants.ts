export interface IFilters {
  [key: string]: IFilterItem;
}

export interface IFilterItem {
  name: string;
  filter?: (name: string) => void;
  query?: string;
}

export const Filters: IFilters = {
  tshirt: {
    name: "Tshirts",
    query: "tshirt"
  },
  sweatshirt: {
    name: "Sweatshirts",
    query: "sweatshirt"
  },
  hoodie: {
    name: "Hoodies",
    query: "hoodie"
  },
  poster: {
    name: "Posters",
    query: "poster"
  },
  mug: {
    name: "Mugs",
    query: "mug"
  },
  pillow: {
    name: "Pillows",
    query: "pillow"
  }
};
