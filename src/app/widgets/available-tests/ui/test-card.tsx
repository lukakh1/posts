import { IqTest } from "@/app/entities/iq-tests/model/iq-test.model";
import { CustomLink } from "@/app/shared/ui";
import { Icon } from "@iconify/react";

interface TestCardProps {
  test: IqTest;
}

export const TestCard = ({ test }: TestCardProps) => {
  return (
    <div className="flex flex-col bg-white rounded-xl py-6 px-4 border-1 border-[#E2E8F0] hover:shadow-md transition-shadow duration-300 gap-y-3">
      <Icon icon={test.icon_name} className="w-9 h-9 text-blue-500" />

      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>

      <div className="flex gap-x-4">
        <div className="flex items-center justify-center text-gray-600 gap-x-1.5">
          <Icon icon="svg-spinners:clock" className="w-4 h-4" />
          <span className="text-sm">{test.duration_min} minutes</span>
        </div>
        <div className="flex items-center justify-center text-gray-600 gap-x-1.5">
          <Icon
            icon="material-symbols-light:quiz-outline-rounded"
            className="w-4 h-4"
          />
          <span className="text-sm">{test.questions_num} questions</span>
        </div>
      </div>

      <div className="text-center">
        <CustomLink
          className="w-full flex items-center justify-center px-8 py-2.5 rounded-xl"
          type="primary"
          href="/"
          disabled={!test.is_available}
        >
          {test.is_available ? `Start ${test.sub_name} test` : "Coming Soon"}
          {test.is_available && (
            <Icon
              icon="material-symbols:arrow-forward"
              className="inline-block ml-2 text-lg"
              aria-hidden="true"
            />
          )}
        </CustomLink>
      </div>
    </div>
  );
};
