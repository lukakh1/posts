import { HeroSectionProps } from "./hero-section.types";
import { SocialLink } from "./social-link.component";

export function HeroSection({ data }: HeroSectionProps) {
  const {
    title,
    subtitle,
    mobileSubtitle,
    socialLinks = [],
    className = "",
    titleClassName = "text-[28px] font-semibold leading-[45px] text-[#2B2D42] md:text-[39px]",
    subtitleClassName = "text-[17px] text-[#454F69]",
    containerClassName = "relative z-0 flex flex-col items-center justify-between gap-3 py-4 md:flex-row md:py-9",
  } = data;

  const hasSocialLinks = socialLinks.length > 0;
  const hasSubtitle = subtitle || mobileSubtitle;

  return (
    <section className={`${containerClassName} ${className}`}>
      <div className="flex flex-col items-center justify-center gap-1 md:items-start w-full">
        <div className="flex flex-row items-start gap-1">
          <h3 className={titleClassName}>{title}</h3>
        </div>

        {hasSubtitle && (
          <>
            {subtitle && (
              <p className={`hidden lg:inline-block ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}
            {mobileSubtitle && (
              <p className={`text-sm lg:hidden ${subtitleClassName}`}>
                {mobileSubtitle}
              </p>
            )}
          </>
        )}
      </div>

      {hasSocialLinks && (
        <div className="text-black">
          <div className="flex w-full justify-end gap-3">
            {socialLinks.map((link, index) => (
              <SocialLink
                key={`${link.href}-${link.icon}-${index}`}
                {...link}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
