import { importAll } from "../../../utils/common";

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

export interface IShowcase {
  [key: string]: IShowcaseItem;
}

export interface IShowcaseItem {
  name: string;
  imageURL: string;
  price?: string;
  available?: boolean;
}

//Fake Images Import
const fakeImages = importAll(
  require.context("../../../assets/images/tshirts", false, /\.(png|jpe?g|svg)$/)
);

export function test() {
  console.log("FAKE IMAGES", fakeImages);
}

export const FakeShowcaseItems: IShowcase = {
  tshirt1: {
    name: "badt",
    imageURL: fakeImages[0]
  },
  tshirt2: {
    name: "badt2",
    imageURL: fakeImages[1]
  },
  tshirt3: {
    name: "badt3",
    imageURL: fakeImages[2]
  },
  tshirt4: {
    name: "badt4",
    imageURL: fakeImages[3]
  },
  tshirt5: {
    name: "badt5",
    imageURL: fakeImages[4]
  },
  tshirt6: {
    name: "badt6",
    imageURL: fakeImages[5]
  },
  tshirt7: {
    name: "badt7",
    imageURL: fakeImages[6]
  }
};
