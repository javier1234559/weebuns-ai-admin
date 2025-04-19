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
  next_review: z.date().optional(),
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
  thumbnailUrl: z.string().nullable(),
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
      analysis_guide: `
      <div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-NTzNd8mj9oUwbFx0MFilTG8bg97">
<h2 style="text-align: center;">HƯỚNG DẪN VIẾT BÀI</h2>
<p>&nbsp;</p>
<h3 data-lark-html-role="root"><em><span class="text-only" data-eleid="34582860">Xem livestream giải đề này cùng thầy Phạm Minh Khoa (<span style="color: rgb(224, 62, 45);"><strong>2 lần 9.0</strong></span>) <span style="text-decoration: underline; color: rgb(53, 152, 219);"><a href="https://www.youtube.com/live/Sx5mXtSr-so?si=wqfUHbOD93tQHH4d" target="_blank" rel="noopener">tại đây bạn nhé!</a></span></span></em></h3>
<p>&nbsp;</p>
</div>
<h2 class="ace-line ace-line old-record-id-NTzNd8mj9oUwbFx0MFilTG8bg97"><span style="color: rgb(230, 126, 35);"><u><strong>1. Giải thích đề</strong></u></span></h2>
<div class="ace-line ace-line old-record-id-L0uxdZ0zIo6kNkx45pJlQDjCgtd">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-Qo8md6CEXo2necxEjnllHlVggjf">
<ul>
<li>Đề bài nói về xu hướng ngày càng nhiều người rời xa bạn bè và gia đình để đi làm việc ở nơi khác. Đề bài yêu cầu bạn cân nhắc xem liệu lợi ích của xu hướng này có lớn hơn những bất lợi hay không.</li>
</ul>
</div>
<div class="ace-line ace-line old-record-id-NDXUdpItXoLV2DxoCQrl5bwqg5b">
<ul>
<li>Đây là một chủ đề phổ biến trong thời đại toàn cầu hóa, khi người lao động có xu hướng di chuyển (<strong>relocate</strong>) đến các thành phố lớn hoặc nước ngoài để tìm kiếm cơ hội việc làm tốt hơn. Xu hướng này đặc biệt phổ biến ở các nước đang phát triển, nơi mà sự chênh lệch về cơ hội giữa các vùng miền còn lớn.</li>
</ul>
</div>
</div>
</div>
<div class="ace-line ace-line old-record-id-KgGvdgcCRoty3TxID2tlQsUpgVu">&nbsp;</div>
<h2 class="ace-line ace-line old-record-id-CaaPdALkUoj39UxqBaClSdzHg7g"><span style="color: rgb(230, 126, 35);"><u><strong>2. Gợi ý lập luận &amp; phân body</strong></u></span></h2>
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-Ts0XdLOqnojknrxKbPZl4Q60gAp">
<ul>
<li>Bạn có thể cho rằng lợi ích lớn hơn hoặc nhỏ hơn so với bất lợi.</li>
<li>
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-XAhFdNE2xokX6wxiL5Ilzllagdg"><strong>Trong bài này, chúng mình sẽ lập luận theo cách 40/60 (balanced approach)</strong></div>
</div>
</li>
<li>Chúng mình cho rằng lợi ích lớn hơn nhiều so với bất lợi (<strong>benefits far outweigh them</strong>). Chúng ta sẽ theo hướng này.
<ul>
<li>Body 1 sẽ bàn về những bất lợi của việc di chuyển đi làm xa.</li>
<li>Body 2 sẽ thảo luận về những lợi ích đáng kể hơn của việc này.</li>
</ul>
</li>
</ul>
</div>
<div class="ace-line ace-line old-record-id-QEJcdkCnZo859gxgp8Gl6opngSc">
<p>&nbsp;</p>
</div>
</div>
<h2 class="ace-line ace-line old-record-id-O6Q8dKUwJolsRLxRHMKlYAGzgPb"><span style="color: rgb(230, 126, 35);"><u><strong>3. Gợi ý viết body 1</strong></u></span></h2>
<div class="ace-line ace-line old-record-id-ARYZdTorMo8GHUxXiaxlbgKog9K">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-JnVdd5876o1C6AxoL09lbl3Eghf">Mình sẽ bàn về những bất lợi của việc di chuyển đi làm xa.</div>
<div class="ace-line ace-line old-record-id-A7yTdYmGLoJtOSx2Ry8lIz6tgsh">Cấu trúc: Topic Sentence ➜ Supporting Idea 1 ➜ Supporting idea 2</div>
</div>
</div>
<h3 class="ace-line ace-line old-record-id-CLqndSonXoG3mbxkiQ3lCXhngfC"><span style="color: rgb(230, 126, 35);">&nbsp;✦ </span><span style="color: rgb(230, 126, 35);"><u>Topic sentence:</u></span></h3>
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">Việc di chuyển đi xa (<strong>relocating</strong>) để tìm việc có thể gây ra một số hậu quả (<strong>consequences</strong>) cho người di cư và xã hội.</div>
<h3 class="ace-line ace-line old-record-id-CLqndSonXoG3mbxkiQ3lCXhngfC"><span style="color: rgb(230, 126, 35);">&nbsp;✦ </span><span style="color: rgb(230, 126, 35);"><u>Supporting idea 1:</u></span></h3>
<div class="ace-line ace-line old-record-id-ZSGudTTeHoUUbwxmgwvlnevNg0d">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">Di cư (<strong>migrating</strong>) có thể gây tác động về mặt cảm xúc (<strong>emotionally impact</strong>) đối với người di cư và người thân</div>
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">&nbsp; ➜ cuộc sống thường xoay quanh các mối quan hệ xã hội đã thiết lập (<strong>established social circles</strong>)&nbsp;</div>
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">&nbsp; ➜ chuyển đến nơi mới có thể gây nhớ nhà (<strong>homesickness</strong>) và cảm giác bỏ lỡ các sự kiện quan trọng (<strong>missing out on important events</strong>)</div>
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">&nbsp; ➜ có thể làm cho các thành viên gia đình xa cách nhau theo thời gian (<strong>drift apart over time</strong>)</div>
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">&nbsp; ➜ đặc biệt đúng ở châu Á, nơi mọi người thường coi trọng thời gian chất lượng với gia đình hơn là giao tiếp xã hội với bạn bè</div>
</div>
</div>
<h3 class="ace-line ace-line old-record-id-CLqndSonXoG3mbxkiQ3lCXhngfC"><span style="color: rgb(230, 126, 35);">&nbsp;✦ </span><span style="color: rgb(230, 126, 35);"><u>Supporting idea 2:</u></span></h3>
<div class="ace-line ace-line old-record-id-RJW5dfJhqofjuXxEd7dlCvwzg3b">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-Ssald24nzoXjj2xV309l2Dkvgef">Ở cấp độ xã hội (<strong>societal level</strong>), di chuyển đi làm xa có thể gây bất ổn cho thị trường lao động (<strong>instability in the labor market</strong>) ở các vùng kém phát triển hơn</div>
<div class="ace-line ace-line old-record-id-Ssald24nzoXjj2xV309l2Dkvgef">&nbsp; ➜ doanh nghiệp nông thôn (<strong>rural enterprises</strong>) khó tìm được ứng viên phù hợp cho vị trí tuyển dụng</div>
<div class="ace-line ace-line old-record-id-Ssald24nzoXjj2xV309l2Dkvgef">&nbsp; ➜ ảnh hưởng đến năng suất (<strong>compromising their productivity</strong>) và khả năng cạnh tranh của nền kinh tế địa phương (<strong>competitiveness of the local economy</strong>)</div>
</div>
</div>
<div class="ace-line ace-line old-record-id-Jo9cdHYcooaKCQxdDaTlbws2gHh">&nbsp;</div>
<h2 class="ace-line ace-line old-record-id-I85fdLrlqovzpLxkUCfldUM5gEg"><span style="color: rgb(230, 126, 35);"><u><strong>4. Gợi ý viết body 2</strong></u> </span></h2>
<div class="ace-line ace-line old-record-id-I85fdLrlqovzpLxkUCfldUM5gEg">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-XPyIddxsIoWELGxXIIhldc1Fgdf">Mình sẽ bàn về những lợi ích đáng kể của việc di chuyển đi làm xa.</div>
<div class="ace-line ace-line old-record-id-VRVgdrfrvoEPRax9q9QlarO7gxc">Cấu trúc: Topic Sentence ➜ Supporting Idea 1 ➜ Supporting idea 2</div>
<div class="ace-line ace-line old-record-id-VRVgdrfrvoEPRax9q9QlarO7gxc">
<h3 class="ace-line ace-line old-record-id-CLqndSonXoG3mbxkiQ3lCXhngfC"><span style="color: rgb(230, 126, 35);">&nbsp;✦ </span><span style="color: rgb(230, 126, 35);"><u>Topic sentence:</u></span></h3>
<div class="ace-line ace-line old-record-id-CPfQdadBFozAWfxfYSUlSA3Vgic">Việc di chuyển đi xa để làm việc mang lại những lợi ích đáng kể hơn (<strong>more significant</strong>) bất lợi của nó.</div>
</div>
</div>
</div>
<h3 class="ace-line ace-line old-record-id-CLqndSonXoG3mbxkiQ3lCXhngfC"><span style="color: rgb(230, 126, 35);">&nbsp;✦ </span><span style="color: rgb(230, 126, 35);"><u>Supporting idea 1:</u></span></h3>
<div class="ace-line ace-line old-record-id-OOMmd2z40oU1GpxeAiOljjORg6c">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class=" old-record-id-VX3od4N2Do3jNwxOYKCljt0pgPc">Về triển vọng nghề nghiệp (<strong>career prospects</strong>), định cư ở một môi trường mới (<strong>settling down in a new environment</strong>) giúp người di cư có cơ hội theo đuổi ước mơ (<strong>pursue their dreams</strong>)</div>
<div class=" old-record-id-VX3od4N2Do3jNwxOYKCljt0pgPc">&nbsp; ➜ tránh xa những người có tư tưởng hẹp hòi ở nông thôn (<strong>narrow minded people in the countryside</strong>)</div>
<div class=" old-record-id-VX3od4N2Do3jNwxOYKCljt0pgPc">&nbsp; ➜ ví dụ ở châu Á, cha mẹ và người lớn tuổi thường đề cao sự ổn định nghề nghiệp hơn là theo đuổi đam mê (<strong>pursuing one's passions</strong>)</div>
<div class=" old-record-id-VX3od4N2Do3jNwxOYKCljt0pgPc">&nbsp; ➜ tạo ra kỳ vọng sai lầm về tương lai của con cái (<strong>false expectations for their children's futures</strong>)&nbsp;</div>
<div class=" old-record-id-VX3od4N2Do3jNwxOYKCljt0pgPc">&nbsp; ➜ kìm hãm tài năng của giới trẻ (<strong>suppressing young people's talents</strong>)</div>
</div>
</div>
<h3 class="ace-line ace-line old-record-id-CLqndSonXoG3mbxkiQ3lCXhngfC"><span style="color: rgb(230, 126, 35);">&nbsp;✦ </span><span style="color: rgb(230, 126, 35);"><u>Supporting idea 2:</u></span></h3>
<div class="ace-line ace-line old-record-id-VZnEdzqc4oEV4wxO5mZluCDFgQd">
<div data-page-id="KDygdzHXmoLYnqxeNBSlhbHrg4c" data-lark-html-role="root" data-docx-has-block-data="false">
<div class="ace-line ace-line old-record-id-GUIed30tMo77UCxt8rHlkzjEg9f">Cơ hội sống ở nước ngoài (<strong>live in a foreign country</strong>)</div>
<div class="ace-line ace-line old-record-id-GUIed30tMo77UCxt8rHlkzjEg9f">&nbsp; ➜ ngoài mức lương có thể cao hơn (<strong>higher salaries</strong>), còn cho phép người di cư theo đuổi những công việc không có sẵn ở quê nhà</div>
<div class="ace-line ace-line old-record-id-GUIed30tMo77UCxt8rHlkzjEg9f">&nbsp; ➜ ví dụ như công nhân IT được hưởng lợi rất nhiều khi làm việc cho các tập đoàn công nghệ lớn ở Mỹ (<strong>major tech corporations in the US</strong>)</div>
</div>
</div>
</div>`,
      sample_essay: {
        instruction: `
        <div class="p-3 body-2 z-10 mb-[4px] flex-1 border border-[#13A62E] rounded-[8px] bg-[#E5F6E9]" style="min-height: calc(54px);"><div><p>It has become more common for people to relocate to a new city or country for work. <strong>Although this trend may present certain challenges, I believe the resultant benefits far outweigh them.</strong></p></div></div>`,
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
        next_review: new Date(),
        created_by: undefined,
      },
    ],
  },
  tags: ["ielts", "writing", "task2"],
  thumbnailUrl: null,
  status: "published",
  createdById: undefined,
};
