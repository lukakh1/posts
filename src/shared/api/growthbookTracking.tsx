"use client";

import type { TrackingCallback, TrackingData } from "@growthbook/growthbook";
import { useEffect } from "react";

export const onExperimentView: TrackingCallback = (experiment, result) => {
  // TODO: Replace with your analytics service (Google Analytics, Segment, etc.)
  console.log("Viewed Experiment", {
    experimentId: experiment.key,
    variationId: result.key,
  });

  // Example: Google Analytics 4
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', 'experiment_view', {
  //     experiment_id: experiment.key,
  //     variant_id: result.key,
  //   });
  // }
};

// Helper component to track experiment views from server components
export function GrowthBookTracking({ data }: { data: TrackingData[] }) {
  useEffect(() => {
    data.forEach(({ experiment, result }) => {
      onExperimentView(experiment, result);
    });
  }, [data]);

  return null;
}
