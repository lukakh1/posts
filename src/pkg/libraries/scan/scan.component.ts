"use client";

import { useEffect } from "react";
import { scan } from "react-scan";

const isDev = process.env.NODE_ENV !== "production";

const ScanComponent = () => {
  useEffect(() => {
    if (isDev) {
      scan({
        showToolbar: isDev,
        enabled: isDev,
      });
    }
  }, []);

  return null;
};

export default ScanComponent;
