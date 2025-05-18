import { z } from "zod";
import {
  LESSON_TYPE_TUPLE,
  LESSON_LEVEL_TUPLE,
  LESSON_STATUS_TUPLE,
  LESSON_TOPIC_TUPLE,
} from "../types/lesson";

// Vocabulary schema
export const vocabularySchema = z.object({
  id: z.string().uuid().optional(),
  term: z.string().min(1, "Term is required"),
  meaning: z.array(z.string()).min(1, "At least one meaning is required"),
  example_sentence: z.string().optional(),
  image_url: z.string().optional(),
  reference_link: z.string().optional(),
  reference_name: z.string().optional(),
  tags: z.array(z.string()).default([]),
  repetition_level: z.number().int().min(0).default(0),
  next_review: z.string().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

// Writing content schema
export const writingContentSchema = z.object({
  ai_prompt: z.string().min(1, "AI prompt is required"),
  task: z.string().min(1, "Task is required"),
  resources: z.object({
    analysis_guide: z.string().min(1, "Analysis guide is required"),
    sample_essay: z
      .object({
        instruction: z.string().optional(),
        body1: z.string().optional(),
        body2: z.string().optional(),
        conclusion: z.string().optional(),
      })
      .optional(),
  }),
  vocabulary_list: z.array(vocabularySchema).default([]),
});

export const writingLessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().nullable(),
  lessonType: z.enum(LESSON_TYPE_TUPLE),
  level: z.enum(LESSON_LEVEL_TUPLE),
  topic: z.enum(LESSON_TOPIC_TUPLE),
  timeLimit: z.number().nullable(),
  content: writingContentSchema.nullable(),
  tags: z.array(z.string()),
  thumbnailUrl: z.string(),
  status: z.enum(LESSON_STATUS_TUPLE),
  createdById: z.string().optional(),
});

export type WritingLessonFormValues = z.infer<typeof writingLessonSchema>;
export type VocabularyItem = z.infer<typeof vocabularySchema>;

export const defaultValues: WritingLessonFormValues = {
  title: "Writing Task 2 : Does workaholism have positive effects?",
  description:
    "Nowadays, more people move away from their friends and families for work. Do advantages outweigh the disadvantages?",
  topic: "ielts",
  level: "intermediate",
  timeLimit: 30,
  lessonType: "practice",
  content: {
    ai_prompt:
      "You are an expert IELTS writing teacher. You help students to improve their IELTS improve Idea and response Example like Introduction,Body1,Body2,Conclusion.",
    task: "Nowadays, more people move away from their friends and families for work. Do advantages outweigh the disadvantages?",
    resources: {
      analysis_guide:
        "<h2>HƯỚNG DẪN VIẾT BÀI</h2><p>&nbsp;</p><h3><em>Xem livestream giải đề này cùng thầy Phạm Minh Khoa (</em><strong><em>2 lần 9.0</em></strong><em>) <u>tại đây bạn nhé!</u></em></h3><p>&nbsp;</p><h2><strong><u>1. Giải thích đề</u></strong></h2><ul><li><p>Đề bài nói về xu hướng ngày càng nhiều người rời xa bạn bè và gia đình để đi làm việc ở nơi khác. Đề bài yêu cầu bạn cân nhắc xem liệu lợi ích của xu hướng này có lớn hơn những bất lợi hay không.</p></li></ul><ul><li><p>Đây là một chủ đề phổ biến trong thời đại toàn cầu hóa, khi người lao động có xu hướng di chuyển (<strong>relocate</strong>) đến các thành phố lớn hoặc nước ngoài để tìm kiếm cơ hội việc làm tốt hơn. Xu hướng này đặc biệt phổ biến ở các nước đang phát triển, nơi mà sự chênh lệch về cơ hội giữa các vùng miền còn lớn.</p></li></ul><p>&nbsp;</p><h2><strong><u>2. Gợi ý lập luận &amp; phân body</u></strong></h2><ul><li><p>Bạn có thể cho rằng lợi ích lớn hơn hoặc nhỏ hơn so với bất lợi.</p></li><li><p><strong>Trong bài này, chúng mình sẽ lập luận theo cách 40/60 (balanced approach)</strong></p></li><li><p>Chúng mình cho rằng lợi ích lớn hơn nhiều so với bất lợi (<strong>benefits far outweigh them</strong>). Chúng ta sẽ theo hướng này.</p><ul><li><p>Body 1 sẽ bàn về những bất lợi của việc di chuyển đi làm xa.</p></li><li><p>Body 2 sẽ thảo luận về những lợi ích đáng kể hơn của việc này.</p></li></ul></li></ul><p>&nbsp;</p><h2><strong><u>3. Gợi ý viết body 1</u></strong></h2><p>Mình sẽ bàn về những bất lợi của việc di chuyển đi làm xa.</p><p>Cấu trúc: Topic Sentence ➜ Supporting Idea 1 ➜ Supporting idea 2</p><h3>&nbsp;✦ <u>Topic sentence:</u></h3><p>Việc di chuyển đi xa (<strong>relocating</strong>) để tìm việc có thể gây ra một số hậu quả (<strong>consequences</strong>) cho người di cư và xã hội.</p><h3>&nbsp;✦ <u>Supporting idea 1:</u></h3><p>Di cư (<strong>migrating</strong>) có thể gây tác động về mặt cảm xúc (<strong>emotionally impact</strong>) đối với người di cư và người thân</p><p>&nbsp; ➜ cuộc sống thường xoay quanh các mối quan hệ xã hội đã thiết lập (<strong>established social circles</strong>)&nbsp;</p><p>&nbsp; ➜ chuyển đến nơi mới có thể gây nhớ nhà (<strong>homesickness</strong>) và cảm giác bỏ lỡ các sự kiện quan trọng (<strong>missing out on important events</strong>)</p><p>&nbsp; ➜ có thể làm cho các thành viên gia đình xa cách nhau theo thời gian (<strong>drift apart over time</strong>)</p><p>&nbsp; ➜ đặc biệt đúng ở châu Á, nơi mọi người thường coi trọng thời gian chất lượng với gia đình hơn là giao tiếp xã hội với bạn bè</p><h3>&nbsp;✦ <u>Supporting idea 2:</u></h3><p>Ở cấp độ xã hội (<strong>societal level</strong>), di chuyển đi làm xa có thể gây bất ổn cho thị trường lao động (<strong>instability in the labor market</strong>) ở các vùng kém phát triển hơn</p><p>&nbsp; ➜ doanh nghiệp nông thôn (<strong>rural enterprises</strong>) khó tìm được ứng viên phù hợp cho vị trí tuyển dụng</p><p>&nbsp; ➜ ảnh hưởng đến năng suất (<strong>compromising their productivity</strong>) và khả năng cạnh tranh của nền kinh tế địa phương (<strong>competitiveness of the local economy</strong>)</p><p>&nbsp;</p><h2><strong><u>4. Gợi ý viết body 2</u></strong></h2><p>Mình sẽ bàn về những lợi ích đáng kể của việc di chuyển đi làm xa.</p><p>Cấu trúc: Topic Sentence ➜ Supporting Idea 1 ➜ Supporting idea 2</p><h3>&nbsp;✦ <u>Topic sentence:</u></h3><p>Việc di chuyển đi xa để làm việc mang lại những lợi ích đáng kể hơn (<strong>more significant</strong>) bất lợi của nó.</p><h3>&nbsp;✦ <u>Supporting idea 1:</u></h3><p>Về triển vọng nghề nghiệp (<strong>career prospects</strong>), định cư ở một môi trường mới (<strong>settling down in a new environment</strong>) giúp người di cư có cơ hội theo đuổi ước mơ (<strong>pursue their dreams</strong>)</p><p>&nbsp; ➜ tránh xa những người có tư tưởng hẹp hòi ở nông thôn (<strong>narrow minded people in the countryside</strong>)</p><p>&nbsp; ➜ ví dụ ở châu Á, cha mẹ và người lớn tuổi thường đề cao sự ổn định nghề nghiệp hơn là theo đuổi đam mê (<strong>pursuing one's passions</strong>)</p><p>&nbsp; ➜ tạo ra kỳ vọng sai lầm về tương lai của con cái (<strong>false expectations for their children's futures</strong>)&nbsp;</p><p>&nbsp; ➜ kìm hãm tài năng của giới trẻ (<strong>suppressing young people's talents</strong>)</p><h3>&nbsp;✦ <u>Supporting idea 2:</u></h3><p>Cơ hội sống ở nước ngoài (<strong>live in a foreign country</strong>)</p><p>&nbsp; ➜ ngoài mức lương có thể cao hơn (<strong>higher salaries</strong>), còn cho phép người di cư theo đuổi những công việc không có sẵn ở quê nhà</p><p>&nbsp; ➜ ví dụ như công nhân IT được hưởng lợi rất nhiều khi làm việc cho các tập đoàn công nghệ lớn ở Mỹ (<strong>major tech corporations in the US</strong>)</p>",
      sample_essay: {
        instruction:
          "<p>It has become more common for people to relocate to a new city or country for work. <strong>Although this trend may present certain challenges, I believe the resultant benefits far outweigh them.</strong></p>",
        body1: `<p><strong>Admittedly, there may be some consequences when people leave their homes for a new place in search of better job opportunities. </strong><span style="color: rgb(45, 194, 107);">One of them is that migrating across the country may emotionally impact migrants and their loved ones. Since life is often centered around established social circles, including families and friends, moving to a new location can result in homesickness and a sense of missing out on important events, potentially causing family members to drift apart over time. This is especially true in Asia, where people often value quality time with their family over socializing with friends. </span><span style="color: rgb(53, 152, 219);">On a societal level, moving away for work could potentially cause instability in the labor market in less developed regions. This is because it could be difficult for rural enterprises to find suitable candidates for their job vacancies, eventually compromising their productivity as well as the competitiveness of the local economy.</span></p>`,
        body2: `
        <p><strong>However, despite these disadvantages, the benefits of relocating for work are more significant.</strong><span style="color: rgb(45, 194, 107);"> In terms of career prospects, settling down in a new environment could help migrants to have the opportunity to pursue their dreams, which would only be possible by moving away from narrow minded people in the countryside. For example, in Asia, parents and the elderly often emphasize career stability over pursuing one’s passions, which leads to false expectations for their children’s futures, thus suppressing young people’s talents. </span><span style="color: rgb(53, 152, 219);">Another benefit could be the opportunity to live in a foreign country, which, in addition to possible higher salaries, enables migrants to pursue jobs that may not be available in their home countries. A case in point is that IT workers stand to benefit greatly from working for major tech corporations in the US.</span></p>`,
        conclusion: `<p dir="ltr">In conclusion, while I acknowledge that relocating for work may pose certain problems relating to migrants' feelings and the rural economy, I am convinced that the advantages in personal and professional growth are far more impactful.</p>`,
      },
    },
    vocabulary_list: [
      {
        term: "Narrow-minded",
        meaning: [
          "Having or showing a lack of understanding or awareness of the wider world or of different opinions or ways of life.",
        ],
        example_sentence:
          "The narrow-minded people in the countryside are not open to new ideas.",
        tags: [],
        repetition_level: 0,
        next_review: new Date().toISOString(),
        created_by: undefined,
      },
    ],
  },
  tags: ["ielts", "writing", "task2"],
  thumbnailUrl: "",
  status: "published",
  createdById: undefined,
};
