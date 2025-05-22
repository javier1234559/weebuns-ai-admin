import { z } from "zod";

export const notificationCreateSchema = z.object({
  title: z.string().min(1),
  userId: z.string().optional().nullable(),
  content: z.string().min(1),
  type: z.enum([
    "system",
    "advertisement",
    "submission",
    "comment_reply",
    "comment_mention",
  ]),
  actionUrl: z.string().min(1),
  thumbnailUrl: z.string().min(1),
  isGlobal: z.boolean().default(false),
});

export type NotificationCreateSchema = z.infer<typeof notificationCreateSchema>;

export const defaultValues: NotificationCreateSchema = {
  title: "Thông báo quảng cáo: Nhận IELTS Insights miễn phí",
  userId: "be6b4aab-d36d-4cd8-a23e-562c4448913f",
  type: "advertisement" as const,
  actionUrl: "https://ielts1984.vn/ielts-insights",
  thumbnailUrl:
    "https://cms.youpass.vn/assets/b72096f2-117a-4021-9662-91771c3bb03e?width=1500",
  isGlobal: true,
  content: `Chúng mình biết bạn không còn xa lạ với các bài mẫu giải đề thi thật. Vì vậy, tại tạp chí IELTS Insights, ngoài bài mẫu, chúng mình sẽ hướng dẫn bạn chi tiết từng bước từ số 0, từ việc:
Cùng bạn phân tích cách lên idea & chống bí ý khi phát triển bài một cách cụ thể
Cùng bạn lập luận, viết cụ thể từng câu vô cùng cặn kẽ
Đề xuất các cách xử lý lặp từ và cung cấp từ vựng theo từng topic
Và đặc biệt, một số bài giải sẽ được đính kèm bài chấm của Cựu giám khảo IELTS để bạn thấy các bài essay chuẩn điểm cao trông như thế nào, cũng như tư duy chấm điểm của giáo khảo chấm thi.`,
};
