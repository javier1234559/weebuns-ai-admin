import { Lesson } from "@/feature/lesson/types/lesson";

export const mockIELTSLessons: Lesson[] = [
  // {
  //   id: "1",
  //   skill: "writing",
  //   skill_type: "academic",
  //   title: "IELTS Writing Task 2: Opinion Essays Masterclass",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Learn how to write a well-structured opinion essay for IELTS Writing Task 2. Master argument development, paragraph organization, and advanced vocabulary usage.",
  //   lesson_type: "Tutorial",
  //   level: "intermediate",
  //   topic: "academic_writing",
  //   time_limit: 60,
  //   content: {
  //     topics: ["Essay structure", "Opinion language", "Common question types"],
  //     practice: ["Sample essays", "Vocabulary exercises"],
  //   },
  //   status: "published",
  //   created_by: "67890-user-id",
  //   created_at: new Date("2024-02-15"),
  //   updated_at: new Date("2024-02-15"),
  // },
  // {
  //   id: "2",
  //   skill: "speaking",
  //   skill_type: "practice",
  //   title: "Speaking Part 2: Mastering the Cue Card",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Essential strategies for IELTS Speaking Part 2. Learn how to structure your answer, use the preparation time effectively, and speak confidently for 2 minutes.",
  //   lesson_type: "Workshop",
  //   level: "beginner",
  //   topic: "speaking_part2",
  //   time_limit: 45,
  //   content: {
  //     examples: ["Sample cue cards", "Model answers"],
  //     strategies: ["Time management", "Note-taking techniques"],
  //   },
  //   status: "published",
  //   created_by: "12345-user-id",
  //   created_at: new Date("2024-02-20"),
  //   updated_at: new Date("2024-02-20"),
  // },
  // {
  //   id: "3",
  //   skill: "listening",
  //   skill_type: "practice",
  //   title: "IELTS Listening Section 3: Academic Discussions",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Focus on understanding academic discussions and lectures in IELTS Listening Section 3. Practice with multiple speakers and academic vocabulary.",
  //   lesson_type: "Practice Test",
  //   level: "advanced",
  //   topic: "listening_strategies",
  //   time_limit: 40,
  //   content: {
  //     exercises: ["Multiple choice", "Form completion", "Matching"],
  //     audioSamples: ["Campus discussions", "Academic lectures"],
  //   },
  //   status: "draft",
  //   created_by: "13579-user-id",
  //   created_at: new Date("2024-02-18"),
  //   updated_at: new Date("2024-02-19"),
  // },
  // {
  //   id: "4",
  //   skill: "reading",
  //   skill_type: "academic",
  //   title: "Reading Skills: Skimming and Scanning Techniques",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Master essential reading techniques for the IELTS Academic Reading test. Learn when and how to skim or scan effectively.",
  //   lesson_type: "Course",
  //   level: "beginner",
  //   topic: "reading_strategies",
  //   time_limit: 90,
  //   content: {
  //     techniques: ["Skimming practice", "Scanning exercises"],
  //     textTypes: ["Academic articles", "Research papers"],
  //   },
  //   status: "published",
  //   created_by: "24680-user-id",
  //   created_at: new Date("2024-02-10"),
  //   updated_at: new Date("2024-02-12"),
  // },
  // {
  //   id: "5",
  //   skill: "writing",
  //   skill_type: "general",
  //   title: "General Training: Letter Writing Essentials",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Complete guide to writing formal, semi-formal, and informal letters for IELTS General Training Writing Task 1.",
  //   lesson_type: "Tutorial",
  //   level: "intermediate",
  //   topic: "general_writing",
  //   time_limit: 60,
  //   content: {
  //     letterTypes: ["Formal", "Semi-formal", "Informal"],
  //     examples: ["Complaint letters", "Request letters"],
  //   },
  //   status: "published",
  //   created_by: "11223-user-id",
  //   created_at: new Date("2024-02-21"),
  //   updated_at: new Date("2024-02-21"),
  // },
  // {
  //   id: "6",
  //   skill: "speaking",
  //   skill_type: "theory",
  //   title: "Speaking Part 3: Advanced Discussion Skills",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Develop advanced discussion skills for Part 3 of the IELTS Speaking test. Focus on abstract topics and complex question types.",
  //   lesson_type: "Workshop",
  //   level: "advanced",
  //   topic: "speaking_part3",
  //   time_limit: 45,
  //   content: {
  //     topics: ["Abstract discussions", "Opinion development"],
  //     practice: ["Sample questions", "Model answers"],
  //   },
  //   status: "published",
  //   created_by: "99887-user-id",
  //   created_at: new Date("2024-02-14"),
  //   updated_at: new Date("2024-02-16"),
  // },
  // {
  //   id: "7",
  //   skill: "vocabulary",
  //   skill_type: "practice",
  //   title: "Academic Vocabulary for IELTS Band 7+",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Build your academic vocabulary bank with high-level terms and collocations commonly found in IELTS Band 7+ responses.",
  //   lesson_type: "Course",
  //   level: "advanced",
  //   topic: "vocabulary",
  //   time_limit: 120,
  //   content: {
  //     wordLists: ["Academic collocations", "Advanced connectors"],
  //     exercises: ["Gap filling", "Word formation"],
  //   },
  //   status: "published",
  //   created_by: "44556-user-id",
  //   created_at: new Date("2024-02-22"),
  //   updated_at: new Date("2024-02-22"),
  // },
  // {
  //   id: "8",
  //   skill: "pronunciation",
  //   skill_type: "practice",
  //   title: "Pronunciation: Connected Speech and Intonation",
  //   image_url: "/images/lessons/thumbnail.png",
  //   description:
  //     "Improve your pronunciation score with focus on connected speech, intonation patterns, and stress in English.",
  //   lesson_type: "Workshop",
  //   level: "intermediate",
  //   topic: "pronunciation",
  //   time_limit: 60,
  //   content: {
  //     topics: ["Connected speech", "Intonation patterns"],
  //     exercises: ["Listening drills", "Speaking practice"],
  //   },
  //   status: "draft",
  //   created_by: "77889-user-id",
  //   created_at: new Date("2024-02-23"),
  //   updated_at: new Date("2024-02-23"),
  // },
];
