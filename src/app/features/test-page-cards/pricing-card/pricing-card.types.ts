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
