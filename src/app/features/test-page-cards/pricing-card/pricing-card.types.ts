export type PricingFeature = {
  label: string;
};

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  cadence: string;
  features: PricingFeature[];
  cta: string;
};
