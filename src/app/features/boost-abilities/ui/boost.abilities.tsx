import { abilitiesData } from "../data/abilities.data";
import { AbilityCard } from "./ability.card";

export function BoostAbilities() {
  return (
    <section className="px-4 pb-5">
      <div className="mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Boost Your Abilities
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Unlock your potential with our comprehensive training package
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {abilitiesData.map((ability) => (
            <AbilityCard key={ability.id} ability={ability} />
          ))}
        </div>
      </div>
    </section>
  );
}
