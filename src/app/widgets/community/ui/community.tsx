import { SocialLink } from "./social.link";

export function Community() {
  return (
    <section className="relative z-0 flex flex-col items-center justify-between gap-3 py-4 md:flex-row md:py-9">
      <div className="flex flex-col items-center justify-center gap-1 md:items-start w-full">
        <div className="flex flex-row items-start gap-1">
          <h3 className="text-[28px] font-semibold leading-[45px] text-[#2B2D42] md:text-[39px]">
            Community
          </h3>
        </div>
        <p className="hidden text-[17px] text-[#454F69] lg:inline-block">
          Follow us on social media for daily quizzes, challenges and brain
          teasers to keep your mind sharp
        </p>
        <p className="text-sm lg:hidden">Follow us on social media</p>
      </div>
      <div className="text-black">
        <div className="flex w-full justify-end gap-3">
          <SocialLink
            href="/"
            icon="devicon:twitter"
            iconClassName="w-8 h-6"
            ariaLabel="Visit Twitter"
          />
          <SocialLink
            href="/"
            icon="mdi:instagram"
            ariaLabel="Visit Instagram"
          />
          <SocialLink href="/" icon="mdi:facebook" ariaLabel="Visit Facebook" />
        </div>
      </div>
    </section>
  );
}
