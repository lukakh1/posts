export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
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
