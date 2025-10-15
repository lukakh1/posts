export interface AbilityData {
  id: string;
  number: number;
  title: string;
  features: string[];
}

export const abilitiesData: AbilityData[] = [
  {
    id: "expert-video-courses",
    number: 1,
    title: "Expert Video Courses",
    features: [
      "20+ hours of expert training",
      "Easy-to-follow lessons",
      "Learn at your own pace",
      "Track your progress",
    ],
  },
  {
    id: "brain-training-games",
    number: 2,
    title: "Brain Training Games",
    features: [
      "Diverse cognitive training exercises",
      "Progressive difficulty levels",
      "Enhance 5 core mental skills: Memory, Logical reasoning, problem-solving mastery, focus and concentration.",
    ],
  },
  {
    id: "puzzles",
    number: 3,
    title: "Puzzles",
    features: [
      "150+ Intelligence-Boosting Puzzles",
      "Smart Difficulty Progression",
      "Master essential brain functions: Pattern Recognition, Strategic Thinking, Analytical Reasoning.",
    ],
  },
];
