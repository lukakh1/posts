import { LocaleSwitcher } from "@/app/features";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full z-10 mt-auto">
      <div className="w-full mt-5 sm:mt-10 md:mt-16 bg-[#001B36] py-6 lg:py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col max-[1320px]:px-6 max-md:px-4">
          <div className="flex flex-col justify-between md:flex-row md:gap-5">
            <div className="flex flex-col justify-start gap-6">
              <Link href="/" className="w-fit flex-shrink-0" aria-label="Logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="105"
                  height="30"
                  fill="none"
                  className="text-white"
                  viewBox="0 0 105 30"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m14.29 22.788-.082-.048zm-8.865-12.77-.373-.148a.7.7 0 0 1-.338.41l-.286.148a4.04 4.04 0 0 0-1.62 1.517 4.253 4.253 0 0 0 .068 4.469l.301.476.002.003c.4.619 1.006 1.07 1.707 1.264a2.9 2.9 0 0 0 2.098-.215l.004-.002a.65.65 0 0 1 .513-.04c.17.056.314.183.399.354.084.173.1.374.041.56a.7.7 0 0 1-.344.417l-.376.197.22.364c.271.448.641.826 1.082 1.101l.01.007a3.2 3.2 0 0 0 2.471.323l.008-.002 6.186-1.85h.001a.65.65 0 0 1 .51.058c.157.09.277.241.33.426a.77.77 0 0 1-.063.555.7.7 0 0 1-.405.344l-1.54.461-.702.211.557.477c.358.306.688.563.991.8v.001c.957.749 1.659 1.297 2.19 2.528l.003.009.005.009c.085.173.217.32.383.422.164.1.354.15.546.145a1.01 1.01 0 0 0 .729-.314 1.06 1.06 0 0 0 .298-.743v-1.698a.76.76 0 0 1 .151-.45.7.7 0 0 1 .372-.254h.002l3.928-1.012c.398-.093.749-.326.993-.656s.367-.734.35-1.145a1.8 1.8 0 0 0-.5-1.237l-.005-.004-.634-.641-.207-.21-.261.136-.255.132a.655.655 0 0 1-.664-.025.7.7 0 0 1-.254-.286v-.001a.73.73 0 0 1 .091-.792.7.7 0 0 1 .208-.167h.001l.433-.224.008-.004.008-.005a3.83 3.83 0 0 0 1.412-1.427 4 4 0 0 0 .519-1.962c0-.42-.08-.835-.235-1.223a3.2 3.2 0 0 0-.67-1.04h-.001l-.328-.339-.002-.001a.8.8 0 0 1-.17-.283l-.07-.22a5.5 5.5 0 0 0-1.784-2.606 5.24 5.24 0 0 0-2.893-1.146l-.14-.01-.115.078a2.62 2.62 0 0 0-1.054 1.499 2.7 2.7 0 0 0 .168 1.837l.003.006a.73.73 0 0 1-.092.792.7.7 0 0 1-.204.165.654.654 0 0 1-.664-.025.7.7 0 0 1-.254-.285 4.2 4.2 0 0 1-.384-2.288 4.15 4.15 0 0 1 .884-2.134l.311-.388-.445-.22a4.845 4.845 0 0 0-3.834-.211l-.485.177.294.425q.203.293.357.616l.001.002.188.388v.002a.75.75 0 0 1-.092.805.656.656 0 0 1-.954.078.7.7 0 0 1-.166-.218l-.184-.396a3.02 3.02 0 0 0-1.334-1.434 2.9 2.9 0 0 0-1.92-.284h-.002A7.1 7.1 0 0 0 7.11 6.66a7.43 7.43 0 0 0-2.058 3.21zm21.38 6.333-.22.25.206.262.375.478.013.017.015.015c.382.392.66.88.807 1.42.146.539.155 1.108.025 1.652a3.26 3.26 0 0 1-.763 1.446 3.1 3.1 0 0 1-1.336.86l-3.104.802-.3.078v1.13c0 .665-.255 1.3-.706 1.768-.451.466-1.06.725-1.69.725h-.005c-.454.005-.9-.126-1.285-.38a2.4 2.4 0 0 1-.882-1.05c-.775-1.796-2.034-2.538-3.47-3.386q-.322-.189-.654-.39l-.152-.093-.17.05-2.002.597h-.001c-.43.125-.876.184-1.323.178h-.01a4.4 4.4 0 0 1-2.339-.657l-.006-.004a4.53 4.53 0 0 1-1.88-2.193l-.101-.246-.266-.003a4.2 4.2 0 0 1-1.99-.532 4.36 4.36 0 0 1-1.529-1.434l-.002-.003-.316-.476a5.7 5.7 0 0 1-.835-2.16 5.8 5.8 0 0 1 .09-2.33 5.65 5.65 0 0 1 1.002-2.084 5.4 5.4 0 0 1 1.732-1.476l.131-.07.053-.14a8.9 8.9 0 0 1 2.499-3.566 8.44 8.44 0 0 1 3.836-1.881 4.3 4.3 0 0 1 2.636.355l.192.092.184-.108a6.2 6.2 0 0 1 3.363-.86 6.24 6.24 0 0 1 3.302 1.084l.431.298.094.064.114.006c1.34.066 2.631.55 3.704 1.388a6.9 6.9 0 0 1 2.309 3.318l.028.088.064.067.145.149a4.76 4.76 0 0 1 1.33 3.29 5.38 5.38 0 0 1-1.342 3.595"
                    clipRule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="m36.63 24 2.182-13.09h2.447l-.358 2.13h.161a4.37 4.37 0 0 1 1.62-1.688q1.031-.613 2.335-.613 1.296 0 2.088.613.802.614 1.048 1.688h.137a4.56 4.56 0 0 1 1.764-1.68q1.134-.621 2.548-.621 1.764 0 2.71 1.125.955 1.116.58 3.358L54.426 24H51.87l1.432-8.54q.213-1.338-.409-1.926-.622-.597-1.628-.597-1.245 0-2.062.768-.819.758-1.006 1.951L46.79 24h-2.532l1.458-8.702q.17-1.074-.392-1.713-.555-.648-1.62-.648-.723 0-1.406.384a3.6 3.6 0 0 0-1.15 1.057 3.7 3.7 0 0 0-.622 1.551L39.179 24zm21.544 4.91q-.58 0-1.031-.095a3 3 0 0 1-.674-.187l.972-2.088q.674.187 1.202.145.537-.043 1.005-.444.47-.4.955-1.26l.477-.862-2.565-13.21h2.625l1.62 10.185h.136l5.011-10.185h2.838l-7.85 14.821q-.554 1.057-1.26 1.756a4.7 4.7 0 0 1-1.569 1.065 4.9 4.9 0 0 1-1.892.358M77.641 5.09V24h-3.998V5.09zm10.427 12.336h3.397l1.709 2.198 1.68 1.957 3.167 3.97h-3.73l-2.18-2.677-1.117-1.588zm10.239-2.88q0 3.093-1.173 5.262-1.163 2.17-3.176 3.315-2.003 1.136-4.505 1.136-2.52 0-4.525-1.145-2.002-1.146-3.166-3.315t-1.164-5.253q0-3.094 1.163-5.263t3.167-3.306q2.004-1.145 4.525-1.145 2.502 0 4.505 1.145 2.013 1.136 3.176 3.306 1.173 2.169 1.173 5.263m-4.053 0q0-2.004-.6-3.38-.59-1.376-1.672-2.086-1.08-.711-2.53-.711t-2.53.71-1.68 2.087q-.59 1.376-.59 3.38t.59 3.379q.6 1.375 1.68 2.086t2.53.711 2.53-.71q1.08-.712 1.672-2.087.6-1.376.6-3.38"
                  />
                </svg>
              </Link>

              <ul className="flex gap-4 text-white">
                <li>
                  <Link
                    href="https://www.reddit.com/r/MyIQ_Official/"
                    target="_blank"
                    aria-label="Reddit"
                    className="text-white hover:opacity-80 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-6 w-6"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/MyIQapp"
                    target="_blank"
                    aria-label="X (Twitter)"
                    className="text-white hover:opacity-80 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 26 27"
                      className="h-6 w-6"
                    >
                      <path
                        fill="currentColor"
                        d="M15.42 11.679 24.89.669h-2.244l-8.224 9.56L7.854.669H.28l9.932 14.456L.28 26.67h2.244l8.684-10.095 6.936 10.095h7.576zm-3.075 3.573-1.006-1.44L3.332 2.36H6.78l6.462 9.243 1.006 1.439 8.4 12.015H19.2l-6.854-9.804z"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/myiq_com"
                    target="_blank"
                    aria-label="Instagram"
                    className="text-white hover:opacity-80 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 29"
                      className="h-6 w-6"
                    >
                      <path
                        fill="currentColor"
                        d="M8.202.768c-1.49.07-2.507.308-3.396.657-.92.359-1.7.84-2.477 1.619a6.9 6.9 0 0 0-1.61 2.48c-.345.892-.578 1.91-.644 3.4s-.08 1.97-.073 5.772c.007 3.8.024 4.278.096 5.772.07 1.489.308 2.506.657 3.396.359.92.84 1.7 1.619 2.477a6.86 6.86 0 0 0 2.483 1.61c.89.344 1.909.579 3.399.644s1.97.08 5.77.073c3.802-.007 4.28-.024 5.774-.095s2.505-.31 3.395-.657c.92-.36 1.7-.84 2.477-1.62a6.85 6.85 0 0 0 1.609-2.483c.345-.89.579-1.91.644-3.398.065-1.494.08-1.971.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397a6.9 6.9 0 0 0-1.62-2.477 6.8 6.8 0 0 0-2.482-1.61c-.891-.344-1.91-.58-3.4-.643S17.775.663 13.974.67 9.695.694 8.202.766m.164 25.309c-1.365-.06-2.106-.286-2.6-.476a4.4 4.4 0 0 1-1.612-1.044 4.3 4.3 0 0 1-1.05-1.608c-.192-.494-.423-1.234-.487-2.6-.07-1.474-.084-1.917-.092-5.655s.006-4.18.07-5.656c.059-1.364.287-2.106.477-2.6a4.34 4.34 0 0 1 1.044-1.612 4.3 4.3 0 0 1 1.608-1.05c.493-.193 1.234-.422 2.598-.487 1.476-.07 1.919-.084 5.656-.092s4.18.006 5.658.07c1.364.06 2.106.286 2.599.477.654.252 1.12.555 1.612 1.044s.795.954 1.05 1.609c.194.492.423 1.232.487 2.597.07 1.476.086 1.919.093 5.656s-.006 4.18-.071 5.656c-.06 1.365-.286 2.106-.476 2.6a4.34 4.34 0 0 1-1.045 1.613 4.3 4.3 0 0 1-1.608 1.05c-.493.192-1.234.422-2.597.487-1.476.069-1.92.084-5.657.092s-4.181-.007-5.657-.071M19.779 7.187a1.68 1.68 0 1 0 3.36-.006 1.68 1.68 0 0 0-3.36.006M6.812 14.683a7.19 7.19 0 0 0 14.378-.028 7.19 7.19 0 0 0-14.378.028m2.523-.005a4.667 4.667 0 1 1 9.334-.022 4.667 4.667 0 0 1-9.334.024"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/MyIQapp"
                    target="_blank"
                    aria-label="Facebook"
                    className="text-white hover:opacity-80 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 29"
                      className="h-6 w-6"
                    >
                      <path
                        fill="currentColor"
                        d="M14 .67c-7.732 0-14 6.268-14 14 0 6.566 4.52 12.075 10.618 13.588v-9.31H7.731V14.67h2.887v-1.843c0-4.765 2.156-6.974 6.835-6.974.887 0 2.417.174 3.043.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296 0-3.183.87-3.183 3.13v1.513h4.573l-.786 4.278h-3.787v9.619C22.628 27.73 28 21.827 28 14.67c0-7.732-6.268-14-14-14"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-row md:gap-5">
              <div className="text-white max-md:mt-6 md:mr-10 lg:mr-20">
                <p className="mb-4 text-lg font-semibold">Customer Support</p>
                <Link
                  href="/help/how-do-i-cancel-my-subscription"
                  className="block text-base font-medium hover:underline"
                >
                  How to Cancel
                </Link>
                <Link
                  href="/help"
                  className="mt-3 flex max-w-max items-center justify-center gap-3 rounded-full border-2 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#001B36]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 16v2a4 4 0 0 1-4 4h-5"
                    />
                  </svg>
                  <p>
                    <span className="xs-sm:whitespace-nowrap">
                      Customer Support
                    </span>
                    <br />
                    24/7/365
                  </p>
                </Link>
              </div>

              <ul className="mb-6 flex flex-col gap-4 max-md:mt-4 md:flex-row md:gap-20 lg:mb-12">
                <li>
                  <p className="mb-4 text-lg font-semibold text-white">Legal</p>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link
                        href="/privacy"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cookie"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Cookie Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms#refund-policy"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Refund Policy
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="mb-4 text-lg font-semibold text-white">
                    About Us
                  </p>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link
                        href="/help"
                        target="_blank"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reviews"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Reviews
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="text-base font-medium text-white hover:underline"
                      >
                        Pricing
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <hr className="shrink-0 bg-gray-200 border-none w-full h-px my-6" />

          <div className="w-full pt-6">
            <div className="flex flex-col gap-4 md:items-end">
              <LocaleSwitcher />

              <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="text-base text-white">
                  <p>
                    Copyright © 2024-2025{" "}
                    <Link
                      href="https://www.reddit.com/r/self/comments/1ijwwei/just_received_myiq_score_and_had_a_reality_check/"
                      target="_blank"
                      className="font-normal text-white no-underline hover:no-underline"
                    >
                      myIQ
                    </Link>
                    ™. All rights reserved. All trademarks referenced herein are
                    the properties of their respective owners.
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {[
                    { label: "Visa", icon: "logos:visa" },
                    { label: "Mastercard", icon: "logos:mastercard" },
                    { label: "PayPal", icon: "logos:paypal" },
                    { label: "Apple Pay", icon: "logos:apple-pay" },
                    { label: "Google Pay", icon: "logos:google-pay" },
                  ].map(({ label, icon }, idx) => (
                    <div
                      key={idx}
                      className="flex h-9 w-[56px] items-center justify-center rounded-lg bg-white"
                      aria-label={label}
                      title={label}
                    >
                      <Icon icon={icon} className="h-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
