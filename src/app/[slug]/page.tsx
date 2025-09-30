// app/[slug]/page.tsx
import { GB_UUID_COOKIE } from "@/middleware";
import { CAMERA_PRODUCT_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { CAMERA_PRODUCT_QUERY } from "@/sanity/lib/queries";
import { configureServerSideGrowthBook } from "@/shared/api/growthbookServer";
import { GrowthBookTracking } from "@/shared/api/growthbookTracking";
import { GrowthBook } from "@growthbook/growthbook";
import { cookies } from "next/headers";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

const EXPERIMENT_FLAG = "flag-sony-a7-iv";

export default async function ProductPage({ params }: Props) {
  // Helper to configure cache for next.js
  configureServerSideGrowthBook();

  // Create and initialize a GrowthBook instance
  const gb = new GrowthBook({
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true,
  });

  await gb.init({ timeout: 1000 });

  // Set targeting attributes for the user
  const cookieStore = await cookies();
  await gb.setAttributes({
    id: cookieStore.get(GB_UUID_COOKIE)?.value || "",
  });

  // Evaluate any feature flags
  const variation = gb.getFeatureValue("flag-sony-a7-iv", "default");

  // Get tracking data for experiments
  const trackingData = gb.getDeferredTrackingCalls();

  const queryParams = {
    slug: (await params).slug,
    titleExperiment: EXPERIMENT_FLAG,
    titleVariant: variation,
    descriptionExperiment: EXPERIMENT_FLAG,
    descriptionVariant: variation,
    imageExperiment: EXPERIMENT_FLAG,
    imageVariant: variation,
  };

  const { data } = (await sanityFetch({
    query: CAMERA_PRODUCT_QUERY,
    params: queryParams,
  })) as { data: CAMERA_PRODUCT_QUERYResult };

  // Cleanup
  gb.destroy();

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The camera you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              📸 Camera World
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Cameras
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Lenses
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Accessories
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Product Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              {data.image ? (
                <Image
                  src={urlFor(data.image)?.url()}
                  alt={data.title || "Camera Image"}
                  className="w-full h-full object-cover"
                  width={800}
                  height={800}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-6xl">📷</span>
                </div>
              )}
            </div>
            {/* A/B Test Info (for demo purposes) */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                🧪 A/B Test Status: {EXPERIMENT_FLAG}
              </h3>
              <div className="text-sm text-blue-700 space-y-1">
                <div>
                  Title Variant:{" "}
                  <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                    {data.title} ({variation === "variation" ? "🅱️" : "🅰️"})
                  </span>
                </div>
                <div>
                  Description Variant:{" "}
                  <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                    {data.description} (
                    {variation === "variation" ? "🅱️" : "🅰️"})
                  </span>
                </div>
                <div>
                  Image Variant:{" "}
                  <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                    ({variation === "variation" ? "🅱️" : "🅰️"})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${data.price?.toLocaleString()}
                </span>
                {data.inStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✅ In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    ❌ Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Key Features */}
            {data.features && data.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {data.specs && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {Object.entries(data.specs).map(
                      ([key, value]) =>
                        value && (
                          <div
                            key={key}
                            className="px-6 py-4 flex justify-between"
                          >
                            <span className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Button */}
            <div className="space-y-4">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 text-lg"
                disabled={!data.inStock}
              >
                {data.inStock ? "🛒 Add to Cart" : "Out of Stock"}
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-8 rounded-xl transition-colors duration-200">
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Camera World. All rights reserved.</p>
            <p className="mt-2 text-sm">A GrowthBook + Sanity + Next.js Demo</p>
          </div>
        </div>
      </footer>

      <GrowthBookTracking data={trackingData} />
    </div>
  );
}
