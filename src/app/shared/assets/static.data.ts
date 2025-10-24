export const abilitiesData = [
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

export const PRICING_PLANS = [
  {
    id: "bi_weekly",
    title: "BI-WEEKLY SUBSCRIPTION",
    price: "47.99",
    cadence: "/2 weeks",
    features: [
      { label: "7-day trial, auto-renews to bi-weekly plan thereafter" },
      { label: "Personalized IQ Certificate" },
      { label: "Comprehensive Cognitive Analysis" },
      { label: "Full Access to Development Tools" },
    ],
    cta: "Get started",
  },
  {
    id: "monthly",
    title: "MONTHLY EXCELLENCE",
    price: "94.99",
    cadence: "/month",
    features: [
      { label: "Maximum Savings on Long-Term Growth" },
      { label: "Complete Cognitive Assessment Suite" },
      { label: "20+ Hours of Expert-Led Courses" },
      { label: "Personalized Development Path" },
    ],
    cta: "Get started",
  },
];

export const steps = [
  {
    icon: "mdi:rocket-launch-outline",
    title: "Take a Test",
    description: "Get an unbiased view of yourself",
  },
  {
    icon: "mdi:file-document-outline",
    title: "Get Your Detailed Report",
    description: "Learn your strengths and discover areas for growth",
  },
  {
    icon: "mdi:chart-line",
    title: "Begin Your Journey",
    description: "Start improving with expert courses and brain training",
  },
];

export const FAQ_ITEMS = [
  {
    id: "refund",
    question: "What if I'm not satisfied with the program?",
    answer:
      "We're confident that you'll see the value and benefits of myIQ, but if you're not satisfied or you are experiencing technical issues, you might be eligible for refund. See our Refund Policy to learn more.",
  },
  {
    id: "cancel",
    question: "How do I cancel my subscription?",
    answer:
      "Canceling is simple and takes less than a few minutes. Visit our Help Center and follow the instructions. You'll maintain access until the end of your current billing period.",
  },
  {
    id: "duration",
    question: "How long does the IQ test take?",
    answer: "The test typically takes 15–25 minutes to complete.",
  },
  {
    id: "retake",
    question: "Can I retake tests?",
    answer:
      "Yes, you can retake tests. We recommend waiting a few days between attempts.",
  },
  {
    id: "devices",
    question: "Can I access myIQ on multiple devices?",
    answer:
      "Absolutely. Your account works across desktop, tablet, and mobile devices.",
  },
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "We take your privacy seriously. Your data is stored securely and compliant with all applicable laws. Data is encrypted using bank-level security, and we never share your personal information with third parties. Your payment information is processed according to PCI-DSS industry standards. You can read more in our Privacy Policy.",
  },
];

export const HERO_DATA = {
  imageUrl: "/chart.png",
  imageAlt: "IQ Test Chart",
  title: "Want to Know Your",
  titleHighlight: "Real IQ Score?",
  description:
    "Take our IQ test and unlock your path to self-discovery and development",
  links: [
    {
      text: "Start IQ Test Now",
      href: "/iq-test",
      type: "primary" as const,
    },
    {
      text: "How It Works",
      href: "/iq-test",
      type: "secondary" as const,
    },
  ],
  showAvatars: true,
  avatarData: {
    images: [
      "/avatars/a1.png",
      "/avatars/a2.png",
      "/avatars/a1.png",
      "/avatars/a3.png",
    ],
    rating: 4.9,
  },
};

export const COMMUNITY = {
  title: "Community",
  subtitle:
    "Follow us on social media for daily quizzes, challenges and brain teasers to keep your mind sharp",
  mobileSubtitle: "Follow us on social media",
  socialLinks: [
    {
      href: "/twitter",
      icon: "devicon:twitter",
      iconClassName: "w-8 h-6",
      ariaLabel: "Visit Twitter",
    },
    {
      href: "/instagram",
      icon: "mdi:instagram",
      ariaLabel: "Visit Instagram",
    },
    {
      href: "/facebook",
      icon: "mdi:facebook",
      ariaLabel: "Visit Facebook",
    },
  ],
};
