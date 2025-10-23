import { AbilityData } from "./ability-card.types";

interface AbilityCardProps {
  ability: AbilityData;
}

export function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <div className="flex h-full flex-col bg-white rounded-2xl py-6 px-4 border border-gray-200 hover:shadow-md transition-shadow duration-200 gap-3">
      <div className="flex">
        <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center bg-gradient-to-r from-[#007AFF] to-[#7CB7F8] p-[3px]">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <span className="text-black font-bold text-xl">
              {ability.number}
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900">{ability.title}</h3>

      <ul className="space-y-2">
        {ability.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-x-1.5">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700 text-sm leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
