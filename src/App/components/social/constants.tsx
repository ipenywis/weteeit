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
    link: "https://fb.com/weteeit",
    icon: faFacebookF
  },
  twitter: {
    link: "",
    icon: faTwitter
  },
  instagram: {
    link: "https://instagram.com/weteeit",
    icon: faInstagram
  },
  pinterest: {
    link: "",
    icon: faPinterestP
  }
};
