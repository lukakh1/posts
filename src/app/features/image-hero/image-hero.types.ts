export interface HeroLink {
  text: string;
  href: string;
  type: "primary" | "secondary";
}

export interface HeroAvatarData {
  images: string[];
  rating?: number;
  text?: string;
  count?: number;
}

export interface HeroData {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  links: HeroLink[];
  showAvatars?: boolean;
  avatarData?: HeroAvatarData;
}

export interface ImageHeroProps {
  heroData: HeroData;
}
