"use client";

import { GrowthBookPayload } from "@growthbook/growthbook";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { PropsWithChildren } from "react";
import { getGBClient } from "../lib/growthbook/growthbook-client";

export default function GBProvider({
  children,
  payload,
  attributes,
}: PropsWithChildren<{
  payload: GrowthBookPayload;
  attributes: { [key: string]: string };
}>) {
  const gb = getGBClient({ attributes }).initSync({ payload });
  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>;
}
