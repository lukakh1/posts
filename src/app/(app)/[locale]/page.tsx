import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl md:text-5xl font-semibold text-[#2B2D42] tracking-tight">
          Welcome
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600">
          Choose where you want to go next.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/my-site"
            className="group rounded-xl border border-blue-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#2B2D42]">
                  Visit Site
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Explore the demo website experience.
                </p>
              </div>
              <span
                aria-hidden
                className="ml-4 h-9 w-9 shrink-0 rounded-full bg-blue-100 text-blue-600 grid place-items-center transition group-hover:bg-blue-200"
              >
                →
              </span>
            </div>
          </Link>

          <Link
            href="/iq-test"
            className="group rounded-xl border border-blue-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#2B2D42]">
                  Take IQ Test
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Start the assessment and view your results.
                </p>
              </div>
              <span
                aria-hidden
                className="ml-4 h-9 w-9 shrink-0 rounded-full bg-blue-100 text-blue-600 grid place-items-center transition group-hover:bg-blue-200"
              >
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
