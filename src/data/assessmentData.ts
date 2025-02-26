export type Question = {
  id: string;
  text: string;
  category: string;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  color: string;
  questions: Question[];
};

export const assessmentData: Category[] = [
  {
    id: "attention",
    title: "Attention & Focus",
    description: "Difficulty maintaining attention and focus on tasks",
    color: "bg-blue-500",
    questions: [
      {
        id: "attention-1",
        text: "How often do you have trouble sustaining attention in tasks?",
        category: "attention"
      },
      {
        id: "attention-2",
        text: "How frequently do you make careless mistakes in work or activities?",
        category: "attention"
      },
      {
        id: "attention-3",
        text: "How often do you find it difficult to concentrate on what people are saying?",
        category: "attention"
      },
      {
        id: "attention-4",
        text: "How often do you avoid tasks requiring sustained mental effort?",
        category: "attention"
      }
    ]
  },
  {
    id: "hyperactivity",
    title: "Hyperactivity & Impulsivity",
    description: "Excessive activity and difficulty controlling impulses",
    color: "bg-red-500",
    questions: [
      {
        id: "hyperactivity-1",
        text: "How often do you fidget or squirm when seated?",
        category: "hyperactivity"
      },
      {
        id: "hyperactivity-2",
        text: "How frequently do you feel restless or 'on the go'?",
        category: "hyperactivity"
      },
      {
        id: "hyperactivity-3",
        text: "How often do you interrupt others when they're talking?",
        category: "hyperactivity"
      },
      {
        id: "hyperactivity-4",
        text: "How often do you have difficulty waiting your turn?",
        category: "hyperactivity"
      }
    ]
  },
  {
    id: "organization",
    title: "Organization & Planning",
    description: "Struggles with organization, planning, and time management",
    color: "bg-green-500",
    questions: [
      {
        id: "organization-1",
        text: "How often do you have trouble organizing tasks and activities?",
        category: "organization"
      },
      {
        id: "organization-2",
        text: "How frequently do you lose things necessary for tasks or activities?",
        category: "organization"
      },
      {
        id: "organization-3",
        text: "How often do you have trouble meeting deadlines?",
        category: "organization"
      },
      {
        id: "organization-4",
        text: "How often do you struggle with time management?",
        category: "organization"
      }
    ]
  },
  {
    id: "emotional",
    title: "Emotional Regulation",
    description: "Difficulty managing emotions and emotional responses",
    color: "bg-purple-500",
    questions: [
      {
        id: "emotional-1",
        text: "How often do you experience mood swings?",
        category: "emotional"
      },
      {
        id: "emotional-2",
        text: "How frequently do you feel overwhelmed by tasks or responsibilities?",
        category: "emotional"
      },
      {
        id: "emotional-3",
        text: "How often do you become frustrated easily?",
        category: "emotional"
      },
      {
        id: "emotional-4",
        text: "How often do you have trouble calming yourself when upset?",
        category: "emotional"
      }
    ]
  },
  {
    id: "social",
    title: "Social Interaction",
    description: "Challenges with social cues and relationships",
    color: "bg-yellow-500",
    questions: [
      {
        id: "social-1",
        text: "How often do you struggle to follow conversations with multiple people?",
        category: "social"
      },
      {
        id: "social-2",
        text: "How frequently do you miss social cues or signals?",
        category: "social"
      },
      {
        id: "social-3",
        text: "How often do you have difficulty maintaining friendships?",
        category: "social"
      },
      {
        id: "social-4",
        text: "How often do others tell you that you talk too much?",
        category: "social"
      }
    ]
  }
];

export const interpretationGuide = {
  "0-30": {
    title: "Minimal Symptoms",
    description: "You display few symptoms associated with ADHD. However, if you're experiencing persistent difficulties, consider consulting a healthcare professional."
  },
  "31-50": {
    title: "Mild Symptoms",
    description: "You show some symptoms consistent with ADHD. These may impact your daily functioning to some degree. Consider discussing these results with a healthcare provider."
  },
  "51-70": {
    title: "Moderate Symptoms",
    description: "Your symptoms suggest a moderate level of ADHD traits. These may significantly impact your daily life. We recommend consulting with a healthcare professional for a proper evaluation."
  },
  "71-100": {
    title: "Significant Symptoms",
    description: "Your responses indicate significant symptoms consistent with ADHD. These likely impact multiple areas of your life. We strongly recommend seeking professional assessment and support."
  }
};

export const getInterpretation = (score: number) => {
  if (score <= 30) return interpretationGuide["0-30"];
  if (score <= 50) return interpretationGuide["31-50"];
  if (score <= 70) return interpretationGuide["51-70"];
  return interpretationGuide["71-100"];
};
