import { LinkCard } from "@/app/shared";

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
          <LinkCard
            href="/my-site"
            title="Visit Site"
            description="Explore the demo website experience."
          />

          <LinkCard
            href="/iq-test"
            title="Take IQ Test"
            description="Start the assessment and view your results."
          />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LinkCard
            href="/login"
            title="Login"
            description="Login to your account."
          />

          <LinkCard
            href="/signup"
            title="Signup"
            description="Create a new account."
          />
        </div>
      </div>
    </main>
  );
}
