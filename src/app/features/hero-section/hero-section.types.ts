export interface SocialLink {
  href: string;
  icon: string;
  iconClassName?: string;
  ariaLabel?: string;
}

export interface HeroSectionData {
  title: string;
  subtitle?: string;
  mobileSubtitle?: string;
  socialLinks?: SocialLink[];
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}

export interface HeroSectionProps {
  data: HeroSectionData;
}
