const frequencyOptions = [
  { text: "Rarely", score: 1 },
  { text: "Sometimes", score: 2 },
  { text: "Often", score: 3 },
  { text: "Almost Always", score: 4 },
];

const positiveOptions = [
  { text: "Strongly Disagree", score: 4 },
  { text: "Disagree", score: 3 },
  { text: "Agree", score: 2 },
  { text: "Strongly Agree", score: 1 },
];

const growthOptions = [
  { text: "Strongly Disagree", score: 1 },
  { text: "Disagree", score: 2 },
  { text: "Agree", score: 3 },
  { text: "Strongly Agree", score: 4 },
];

const quizzes = [
  {
    title: "Stress Assessment",
    description:
      "Reflect on emotional pressure, overwhelm patterns, and perceived stress in daily life.",
    category: "Stress",
    reference: {
      title: "Perceived Stress Scale",
      source: "New Hampshire Department of Administrative Services Wellness",
      url: "https://www.das.nh.gov/wellness/docs/percieved%20stress%20scale.pdf",
    },
    questions: [
      {
        question:
          "How often do you feel unable to control important things in your life?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel nervous or emotionally stressed?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do responsibilities feel heavier than usual?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do small problems feel difficult to manage?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel overwhelmed by things you need to finish?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel irritated because of pressure?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel that things are piling up too fast?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you struggle to relax after a busy day?",
        options: frequencyOptions,
      },
      {
        question:
          "How often does stress affect your sleep or rest?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel emotionally drained by daily demands?",
        options: frequencyOptions,
      },
    ],
  },

  {
    title: "Anxiety Pattern Analysis",
    description:
      "Explore anxious thoughts, worry cycles, tension, and emotional uneasiness.",
    category: "Anxiety",
    reference: {
      title: "Hamilton Anxiety Rating Scale",
      source: "University of Florida Psychiatry",
      url: "https://dcf.psychiatry.ufl.edu/files/2011/05/HAMILTON-ANXIETY.pdf",
    },
    questions: [
      {
        question:
          "How often do you feel worried without a clear reason?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do racing thoughts disturb your focus?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel tense or restless?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you fear that something bad might happen?",
        options: frequencyOptions,
      },
      {
        question:
          "How often does worry affect your sleep?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you overthink conversations or situations?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel physically uneasy when anxious?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you seek reassurance because of worry?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you avoid situations because of nervousness?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you find it hard to calm your thoughts?",
        options: frequencyOptions,
      },
    ],
  },

  {
    title: "Self-Esteem Reflection",
    description:
      "Explore confidence, self-worth, self-respect, and personal acceptance.",
    category: "Self Esteem",
    reference: {
      title: "Rosenberg Self-Esteem Scale",
      source: "American Psychological Association",
      url: "https://www.apa.org/obesity-guideline/rosenberg-self-esteem.pdf",
    },
    questions: [
      {
        question:
          "I feel that I am a person of worth.",
        options: positiveOptions,
      },
      {
        question:
          "I feel that I have good qualities.",
        options: positiveOptions,
      },
      {
        question:
          "I am able to do things as well as most people.",
        options: positiveOptions,
      },
      {
        question:
          "I take a positive attitude toward myself.",
        options: positiveOptions,
      },
      {
        question:
          "I feel satisfied with myself.",
        options: positiveOptions,
      },
      {
        question:
          "I sometimes feel I am not good enough.",
        options: frequencyOptions,
      },
      {
        question:
          "I often compare myself negatively with others.",
        options: frequencyOptions,
      },
      {
        question:
          "I feel confident expressing my opinions.",
        options: positiveOptions,
      },
      {
        question:
          "I believe I deserve respect from others.",
        options: positiveOptions,
      },
      {
        question:
          "I accept myself even when I make mistakes.",
        options: positiveOptions,
      },
    ],
  },

  {
    title: "Emotional Intelligence Assessment",
    description:
      "Reflect on emotional awareness, empathy, regulation, and communication.",
    category: "Emotional Intelligence",
    reference: {
      title: "Emotional Intelligence Questionnaire",
      source: "SchoolInsites Document Resource",
      url: "https://content.schoolinsites.com/api/documents/3df70f760a23476991da0ce58ea21024.pdf",
    },
    questions: [
      {
        question:
          "I can recognize what I am feeling in the moment.",
        options: growthOptions,
      },
      {
        question:
          "I understand why my emotions change.",
        options: growthOptions,
      },
      {
        question:
          "I can calm myself when I feel upset.",
        options: growthOptions,
      },
      {
        question:
          "I notice how my words affect others.",
        options: growthOptions,
      },
      {
        question:
          "I can understand emotions from another person's point of view.",
        options: growthOptions,
      },
      {
        question:
          "I express my feelings clearly without hurting others.",
        options: growthOptions,
      },
      {
        question:
          "I handle criticism without reacting immediately.",
        options: growthOptions,
      },
      {
        question:
          "I can identify emotional triggers in myself.",
        options: growthOptions,
      },
      {
        question:
          "I try to resolve conflicts calmly.",
        options: growthOptions,
      },
      {
        question:
          "I reflect on my emotional reactions after difficult situations.",
        options: growthOptions,
      },
    ],
  },

  {
    title: "Optimism Scale",
    description:
      "Explore hopeful thinking, future expectations, and positive outlook patterns.",
    category: "Optimism",
    reference: {
      title: "Life Orientation Test - Revised",
      source: "Carnegie Mellon University",
      url: "https://www.cmu.edu/dietrich/psychology/pdf/scales/LOTR_Scale.pdf",
    },
    questions: [
      {
        question:
          "I usually expect good things to happen.",
        options: growthOptions,
      },
      {
        question:
          "I feel hopeful about my future.",
        options: growthOptions,
      },
      {
        question:
          "When things go wrong, I believe they can improve.",
        options: growthOptions,
      },
      {
        question:
          "I can find something positive even in difficult situations.",
        options: growthOptions,
      },
      {
        question:
          "I usually believe my efforts will lead to progress.",
        options: growthOptions,
      },
      {
        question:
          "I often expect things to go badly.",
        options: frequencyOptions,
      },
      {
        question:
          "I find it difficult to imagine positive outcomes.",
        options: frequencyOptions,
      },
      {
        question:
          "I believe setbacks are temporary.",
        options: growthOptions,
      },
      {
        question:
          "I feel motivated when thinking about future goals.",
        options: growthOptions,
      },
      {
        question:
          "I trust that I can handle upcoming challenges.",
        options: growthOptions,
      },
    ],
  },

  {
    title: "Self-Efficacy Scale",
    description:
      "Measure belief in your ability to handle challenges and solve problems.",
    category: "Self Efficacy",
    reference: {
      title: "General Self-Efficacy Scale",
      source: "Drugs and Alcohol Ireland Resource",
      url: "https://www.drugsandalcohol.ie/26768/1/General_Self-Efficacy_Scale%20(GSE).pdf",
    },
    questions: [
      {
        question:
          "I can solve difficult problems if I try hard enough.",
        options: growthOptions,
      },
      {
        question:
          "I can handle unexpected situations effectively.",
        options: growthOptions,
      },
      {
        question:
          "I can stay calm when facing challenges.",
        options: growthOptions,
      },
      {
        question:
          "I can usually find a way to reach my goals.",
        options: growthOptions,
      },
      {
        question:
          "I trust myself to make decisions.",
        options: growthOptions,
      },
      {
        question:
          "I can recover after making mistakes.",
        options: growthOptions,
      },
      {
        question:
          "I can manage difficult tasks step by step.",
        options: growthOptions,
      },
      {
        question:
          "I believe I can improve with effort.",
        options: growthOptions,
      },
      {
        question:
          "I can ask for help when needed.",
        options: growthOptions,
      },
      {
        question:
          "I can keep going even when progress is slow.",
        options: growthOptions,
      },
    ],
  },

  {
    title: "Resilience Check",
    description:
      "Reflect on emotional recovery, adaptability, and bouncing back after stress.",
    category: "Resilience",
    reference: {
      title: "Brief Resilience Scale",
      source: "Ohio State University",
      url: "https://ogg.osu.edu/media/documents/MB%20Stream/Brief%20Resilience%20Scale.pdf",
    },
    questions: [
      {
        question:
          "I recover emotionally after stressful events.",
        options: growthOptions,
      },
      {
        question:
          "I can adapt when plans suddenly change.",
        options: growthOptions,
      },
      {
        question:
          "I bounce back after disappointment.",
        options: growthOptions,
      },
      {
        question:
          "I can stay steady during difficult times.",
        options: growthOptions,
      },
      {
        question:
          "I learn from challenges instead of feeling defeated.",
        options: growthOptions,
      },
      {
        question:
          "It takes me a long time to recover from stress.",
        options: frequencyOptions,
      },
      {
        question:
          "I feel stuck after emotional setbacks.",
        options: frequencyOptions,
      },
      {
        question:
          "I can find strength during hard situations.",
        options: growthOptions,
      },
      {
        question:
          "I can continue functioning even when life feels difficult.",
        options: growthOptions,
      },
      {
        question:
          "I believe I can grow through challenges.",
        options: growthOptions,
      },
    ],
  },

  {
    title: "Depression Anxiety Stress Reflection",
    description:
      "Reflect on emotional distress, low mood, anxious tension, and stress symptoms.",
    category: "Emotional Distress",
    reference: {
      title: "DASS-21",
      source: "Motor Accident Insurance Commission Queensland",
      url: "https://maic.qld.gov.au/wp-content/uploads/2016/07/DASS-21.pdf",
    },
    questions: [
      {
        question:
          "How often do you find it hard to feel positive emotions?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel emotionally down or low?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel tense or unable to relax?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel nervous without a clear reason?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel irritated or impatient?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel that nothing feels enjoyable?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel emotionally overloaded?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel worried about losing control?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do you feel mentally exhausted?",
        options: frequencyOptions,
      },
      {
        question:
          "How often do emotional difficulties affect your daily routine?",
        options: frequencyOptions,
      },
    ],
  },

  {
    title: "Well-Being Check",
    description:
      "Explore mood, vitality, calmness, interest, and overall emotional well-being.",
    category: "Well Being",
    reference: {
      title: "WHO-5 Well-Being Index",
      source: "World Health Organization",
      url: "https://cdn.who.int/media/docs/default-source/mental-health/who-5_english-original4da539d6ed4b49389e3afe47cda2326a.pdf?sfvrsn=ed43f352_11&download=true",
    },
    questions: [
      {
        question:
          "I have felt cheerful and in good spirits recently.",
        options: growthOptions,
      },
      {
        question:
          "I have felt calm and relaxed recently.",
        options: growthOptions,
      },
      {
        question:
          "I have felt active and energetic recently.",
        options: growthOptions,
      },
      {
        question:
          "I have woken up feeling fresh and rested.",
        options: growthOptions,
      },
      {
        question:
          "My daily life has felt interesting.",
        options: growthOptions,
      },
      {
        question:
          "I have felt emotionally present in my daily activities.",
        options: growthOptions,
      },
      {
        question:
          "I have felt connected to people around me.",
        options: growthOptions,
      },
      {
        question:
          "I have been able to enjoy simple moments.",
        options: growthOptions,
      },
      {
        question:
          "I have felt hopeful about the day ahead.",
        options: growthOptions,
      },
      {
        question:
          "I have felt balanced in my mind and body.",
        options: growthOptions,
      },
    ],
  },

  {
    title: "Mindful Recovery Assessment",
    description:
      "Reflect on rest, recovery, self-care, and emotional restoration habits.",
    category: "Recovery",
    reference: {
      title: "MindMirror Educational Recovery Reflection",
      source: "MindMirror Original Wellness Content",
      url: "",
    },
    questions: [
      {
        question:
          "I give myself enough time to rest after stressful days.",
        options: growthOptions,
      },
      {
        question:
          "I notice when my body needs a break.",
        options: growthOptions,
      },
      {
        question:
          "I create boundaries when I feel emotionally drained.",
        options: growthOptions,
      },
      {
        question:
          "I use healthy ways to calm myself.",
        options: growthOptions,
      },
      {
        question:
          "I allow myself to pause without guilt.",
        options: growthOptions,
      },
      {
        question:
          "I recover well after emotionally intense situations.",
        options: growthOptions,
      },
      {
        question:
          "I maintain routines that support my mental well-being.",
        options: growthOptions,
      },
      {
        question:
          "I can identify when I am close to burnout.",
        options: growthOptions,
      },
      {
        question:
          "I make time for activities that restore me.",
        options: growthOptions,
      },
      {
        question:
          "I treat myself with patience during difficult phases.",
        options: growthOptions,
      },
    ],
  },
];

module.exports = quizzes;