const express = require("express");

const router = express.Router();

const psychologyResources = [
  {
    title: "Understanding Anxiety and Overthinking",
    category: "Anxiety",
    description:
      "Helpful resources about anxiety, worry cycles, overthinking, and emotional uneasiness.",
    keywords: [
      "anxiety",
      "overthinking",
      "worry",
      "panic",
      "nervousness",
      "fear",
      "racing thoughts",
    ],
    links: [
      {
        title: "Anxiety Disorders",
        source: "National Institute of Mental Health",
        url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      },
      {
        title: "Anxiety",
        source: "American Psychological Association",
        url: "https://www.apa.org/topics/anxiety",
      },
      {
        title: "Generalized Anxiety Disorder",
        source: "Mayo Clinic",
        url: "https://www.mayoclinic.org/diseases-conditions/generalized-anxiety-disorder/symptoms-causes/syc-20360803",
      },
    ],
  },

  {
    title: "The Psychology Behind Emotional Burnout",
    category: "Burnout",
    description:
      "Resources about emotional exhaustion, burnout symptoms, and recovery.",
    keywords: [
      "burnout",
      "exhaustion",
      "emotional exhaustion",
      "work stress",
      "fatigue",
      "recovery",
    ],
    links: [
      {
        title: "Burn-out an occupational phenomenon",
        source: "World Health Organization",
        url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
      },
      {
        title: "Search Burnout on APA",
        source: "American Psychological Association",
        url: "https://www.google.com/search?q=burnout+site%3Aapa.org",
      },
      {
        title: "Job Burnout",
        source: "Mayo Clinic",
        url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642",
      },
    ],
  },

  {
    title: "How Sleep Affects Mental Wellness",
    category: "Sleep",
    description:
      "Resources about sleep, emotional regulation, and mental wellness.",
    keywords: [
      "sleep",
      "insomnia",
      "rest",
      "sleep deprivation",
      "tiredness",
      "mental wellness",
    ],
    links: [
      {
        title: "Sleep and Mental Health",
        source: "Harvard Health Publishing",
        url: "https://www.health.harvard.edu/newsletter_article/sleep-and-mental-health",
      },
      {
        title: "Sleep Deprivation and Deficiency",
        source: "National Heart, Lung, and Blood Institute",
        url: "https://www.nhlbi.nih.gov/health/sleep-deprivation",
      },
      {
        title: "Sleep",
        source: "American Psychological Association",
        url: "https://www.apa.org/topics/sleep",
      },
    ],
  },

  {
    title: "Building Emotional Intelligence",
    category: "Emotional Intelligence",
    description:
      "Resources about emotional awareness, empathy, regulation, and communication.",
    keywords: [
      "emotional intelligence",
      "empathy",
      "self awareness",
      "emotional awareness",
      "communication",
      "emotional regulation",
    ],
    links: [
      {
        title: "Emotional Intelligence",
        source: "Psychology Today",
        url: "https://www.psychologytoday.com/us/basics/emotional-intelligence",
      },
      {
        title: "Emotional Intelligence",
        source: "Verywell Mind",
        url: "https://www.verywellmind.com/what-is-emotional-intelligence-2795423",
      },
      {
        title: "Emotional Intelligence in Leadership",
        source: "Harvard Business School Online",
        url: "https://online.hbs.edu/blog/post/emotional-intelligence-in-leadership",
      },
    ],
  },

  {
    title: "Why We Constantly Seek Validation",
    category: "Validation",
    description:
      "Resources about approval-seeking, self-worth, emotional dependency, and social validation.",
    keywords: [
      "validation",
      "approval",
      "approval seeking",
      "self worth",
      "self esteem",
      "dependency",
    ],
    links: [
      {
        title: "Self-Esteem",
        source: "American Psychological Association",
        url: "https://www.google.com/search?q=self+esteem+site%3Aapa.org",
      },
      {
        title: "Search Approval-Seeking Behavior",
        source: "Psychology Today",
        url: "https://www.google.com/search?q=approval+seeking+behavior+site%3Apsychologytoday.com",
      },
      {
        title: "Self-Worth",
        source: "Verywell Mind",
        url: "https://www.verywellmind.com/what-is-self-worth-6543764",
      },
    ],
  },

  {
    title: "Trauma Responses and Emotional Triggers",
    category: "Trauma",
    description:
      "Resources about trauma responses, emotional triggers, stress memories, and healing.",
    keywords: [
      "trauma",
      "trigger",
      "emotional triggers",
      "ptsd",
      "stress memories",
      "healing",
    ],
    links: [
      {
        title: "Trauma",
        source: "American Psychological Association",
        url: "https://www.apa.org/topics/trauma",
      },
      {
        title: "Post-Traumatic Stress Disorder",
        source: "National Institute of Mental Health",
        url: "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd",
      },
      {
        title: "Search Trauma Resources",
        source: "Merck Manual",
        url: "https://www.google.com/search?q=trauma+stress+related+disorders+site%3Amerckmanuals.com",
      },
    ],
  },

  {
    title: "The Science of Dopamine and Motivation",
    category: "Motivation",
    description:
      "Resources about motivation, reward systems, habits, focus, and dopamine.",
    keywords: [
      "dopamine",
      "motivation",
      "reward",
      "focus",
      "habits",
      "productivity",
    ],
    links: [
      {
        title: "Dopamine",
        source: "Cleveland Clinic",
        url: "https://my.clevelandclinic.org/health/articles/22581-dopamine",
      },
      {
        title: "Motivation",
        source: "Psychology Today",
        url: "https://www.psychologytoday.com/us/basics/motivation",
      },
      {
        title: "Search Motivation on APA",
        source: "American Psychological Association",
        url: "https://www.google.com/search?q=motivation+psychology+site%3Aapa.org",
      },
    ],
  },

  {
    title: "Attachment Styles in Relationships",
    category: "Relationships",
    description:
      "Resources about attachment patterns, emotional bonding, and relationship behavior.",
    keywords: [
      "attachment",
      "relationships",
      "relationship",
      "bonding",
      "love",
      "attachment styles",
    ],
    links: [
      {
        title: "Attachment",
        source: "Psychology Today",
        url: "https://www.psychologytoday.com/us/basics/attachment",
      },
      {
        title: "Attachment Theory",
        source: "Simply Psychology",
        url: "https://www.simplypsychology.org/attachment.html",
      },
      {
        title: "Relationships",
        source: "American Psychological Association",
        url: "https://www.google.com/search?q=relationships+psychology+site%3Aapa.org",
      },
    ],
  },
];

router.get("/", (req, res) => {
  res.json(psychologyResources);
});

router.get("/search", (req, res) => {
  const topic = String(req.query.topic || "")
    .toLowerCase()
    .trim();

  if (!topic) {
    return res.json(psychologyResources);
  }

  const matchedResources = psychologyResources.filter((resource) => {
    const searchableText = [
      resource.title,
      resource.category,
      resource.description,
      ...(resource.keywords || []),
      ...resource.links.map((link) => link.title),
      ...resource.links.map((link) => link.source),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(topic);
  });

  if (matchedResources.length > 0) {
    return res.json(matchedResources);
  }

  const customSearchResource = {
    title: `Search results for "${topic}"`,
    category: "Psychology Search",
    description:
      "This topic is not in the default MindMirror library yet, but you can explore trusted psychology-related resources using the links below.",
    keywords: [topic],
    links: [
      {
        title: `Search "${topic}" on APA`,
        source: "American Psychological Association",
        url: `https://www.google.com/search?q=${encodeURIComponent(
          topic + " psychology site:apa.org"
        )}`,
      },
      {
        title: `Search "${topic}" on NIMH`,
        source: "National Institute of Mental Health",
        url: `https://www.google.com/search?q=${encodeURIComponent(
          topic + " mental health site:nimh.nih.gov"
        )}`,
      },
      {
        title: `Search "${topic}" on Psychology Today`,
        source: "Psychology Today",
        url: `https://www.google.com/search?q=${encodeURIComponent(
          topic + " psychology site:psychologytoday.com"
        )}`,
      },
      {
        title: `Search "${topic}" on Google Scholar`,
        source: "Google Scholar",
        url: `https://scholar.google.com/scholar?q=${encodeURIComponent(
          topic + " psychology"
        )}`,
      },
    ],
  };

  res.json([customSearchResource]);
});

router.get("/:id", (req, res) => {
  const blog = psychologyResources.find((resource) => {
    const generatedId = resource.title
      .toLowerCase()
      .replaceAll("&", "and")
      .replaceAll(" ", "-");

    return generatedId === req.params.id;
  });

  if (!blog) {
    return res.status(404).json({
      message: "Blog resource not found",
    });
  }

  res.json(blog);
});

module.exports = router;