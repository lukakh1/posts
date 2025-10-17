import { IqTest } from "@/app/entities/iq-tests/model/iq-test.model";
import { TestCard } from "./test-card";

export const TestsDisplay = ({ testsData }: { testsData: IqTest[] }) => {
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

        <div className="flex gap-6 pt-8 overflow-x-auto pb-4">
          {testsData.map((test) => (
            <div
              key={test.id}
              className="flex-shrink-0"
              style={{ width: `calc((100% - (3 * 1.5rem)) / 4)` }}
            >
              <TestCard test={test} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
