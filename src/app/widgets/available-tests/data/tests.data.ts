export interface TestData {
  id: string;
  title: string;
  icon: string;
  duration: string;
  questions: number;
  href: string;
  isAvailable: boolean;
  buttonText: string;
}

export const testsData: TestData[] = [
  {
    id: "iq-test",
    title: "IQ / Intelligence Test",
    icon: "streamline-color:brain",
    duration: "15 minutes",
    questions: 25,
    href: "/iq-test",
    isAvailable: true,
    buttonText: "Start IQ Test Now",
  },
  {
    id: "personality-test",
    title: "Personality Type",
    icon: "fa-solid:head-side-virus",
    duration: "20 minutes",
    questions: 90,
    href: "/personality-test",
    isAvailable: true,
    buttonText: "Start Personality Test",
  },
  {
    id: "love-style-test",
    title: "Love Style",
    icon: "simple-icons:handshake-protocol",
    duration: "30 minutes",
    questions: 120,
    href: "/love-style-test",
    isAvailable: true,
    buttonText: "Start Love Style Test",
  },
  {
    id: "career-test",
    title: "Career",
    icon: "streamline-freehand:business-cash-idea",
    duration: "25 minutes",
    questions: 35,
    href: "/career-test",
    isAvailable: false,
    buttonText: "Coming Soon",
  },
];
