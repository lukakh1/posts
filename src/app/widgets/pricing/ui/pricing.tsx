import Link from "next/link";
import { PRICING_PLANS } from "../data/pricing.data";
import { PricingCard } from "./pricing.card";

export function Pricing() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="order-4 text-center text-black text-3xl font-semibold text-dark-custom md:text-4xl">
            Explore our plans
          </h3>
          <p className="text-black mt-0.5">
            Discover our flexible offers and choose the one that best suits your
            learning and personal development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto place-items-center md:place-items-stretch">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-[15px] leading-5 text-black">
        *Visit our{" "}
        <Link className="underline" href="/">
          pricing page
        </Link>{" "}
        to find out more details.
      </p>
    </section>
  );
}
