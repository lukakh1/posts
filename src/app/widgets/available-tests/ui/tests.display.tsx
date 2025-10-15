import { testsData } from "../data/tests.data";
import { TestCard } from "./test-card";

export const TestsDisplay = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-ssemibold text-gray-900 md:text-4xl mb-4">
            Available Tests
          </h2>
          <p className="text-base text-[#2C3345] md:text-lg">
            Each test reveals a new part of you. Start with intelligence, with
            more tests coming soon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {testsData.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </section>
  );
};
