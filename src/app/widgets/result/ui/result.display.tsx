import { Result } from "@/app/entities/results";
import { ResultCard } from "./result.card";

export function ResultDisplay({ resultsData }: { resultsData: Result[] }) {
  return (
    <section className="w-full py-6 md:py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-[39px] font-semibold text-gray-900 mb-12">
          What Will You Get
        </h2>

        <div className="overflow-x-auto xl:overflow-visible -mx-4 px-4">
          <div className="flex gap-4 xl:grid xl:grid-cols-5 xl:gap-6">
            {resultsData.map((item) => (
              <ResultCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
