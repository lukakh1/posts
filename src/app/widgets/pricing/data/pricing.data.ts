export type PricingFeature = {
  label: string;
};

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  cadence: string; // e.g., "/2 weeks" or "/month"
  features: PricingFeature[];
  cta: string;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "bi_weekly",
    title: "BI-WEEKLY SUBSCRIPTION",
    price: "47.99",
    cadence: "/2 weeks",
    features: [
      { label: "7-day trial, auto-renews to bi-weekly plan thereafter" },
      { label: "Personalized IQ Certificate" },
      { label: "Comprehensive Cognitive Analysis" },
      { label: "Full Access to Development Tools" },
    ],
    cta: "Get started",
  },
  {
    id: "monthly",
    title: "MONTHLY EXCELLENCE",
    price: "94.99",
    cadence: "/month",
    features: [
      { label: "Maximum Savings on Long-Term Growth" },
      { label: "Complete Cognitive Assessment Suite" },
      { label: "20+ Hours of Expert-Led Courses" },
      { label: "Personalized Development Path" },
    ],
    cta: "Get started",
  },
];
