import { resultItems } from "../data/result.data";
import { ResultCard } from "./result.card";

export function ResultDisplay() {
  return (
    <section className="w-full py-6 md:py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-[39px] font-semibold text-gray-900 mb-12">
          What Will You Get
        </h2>

        <div className="overflow-x-auto md:overflow-visible -mx-4 px-4">
          <div className="flex gap-4 md:grid md:grid-cols-2 xl:grid-cols-5 md:gap-6">
            {resultItems.map((item) => (
              <ResultCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
