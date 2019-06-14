import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterestP,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons";

export interface ISocialMediaItem {
  link: string;
  icon: IconDefinition;
}

export interface ISocialMedia {
  [item: string]: ISocialMediaItem;
}

export const socialMedia: ISocialMedia = {
  facebook: {
    link: "",
    icon: faFacebookF
  },
  twitter: {
    link: "",
    icon: faTwitter
  },
  instagram: {
    link: "",
    icon: faInstagram
  },
  pinterest: {
    link: "",
    icon: faPinterestP
  }
};
