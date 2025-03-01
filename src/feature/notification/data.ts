// Định nghĩa các loại thông báo
export const notificationTypes = [
  {
    id: "submission",
    label: "Nộp bài",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  },
  {
    id: "advertisement",
    label: "Quảng cáo",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100",
  },
  {
    id: "comment_reply",
    label: "Phản hồi bình luận",
    color: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  },
  {
    id: "comment_mention",
    label: "Đề cập",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  },
  {
    id: "system",
    label: "Hệ thống",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  },
];

// Dữ liệu mẫu cho thông báo
export const mockNotifications = [
  {
    id: "1",
    title: "Bạn đã gửi bài viết để kiểm tra",
    link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
    dateCreated: "2024-05-06T12:17:23.345Z",
    isRead: false,
    type: "submission",
    recipients: "all",
    status: "published",
  },
  {
    id: "2",
    title: "Luyện Writing AI / Reading / Listening FREE",
    link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
    dateCreated: "2024-05-06T12:17:23.345Z",
    isRead: false,
    type: "advertisement",
    recipients: "premium",
    status: "published",
  },
  {
    id: "3",
    title: "John Doe đã bình luận bài viết của bạn",
    link: "/luyen-thi/ielts/writing/task-1?status=unfinished",
    dateCreated: "2024-05-06T12:17:23.345Z",
    isRead: false,
    type: "comment_reply",
    recipients: "specific",
    status: "draft",
  },
];

// Dữ liệu mẫu cho banner
export const mockBanners = [
  {
    id: "1",
    title: "Hướng dẫn viết Writing Task 1",
    image:
      "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
    link: "/ielts-writing-task-1-guide",
    dateCreated: "2024-05-01T10:00:00.000Z",
    status: "published",
    position: 1,
  },
  {
    id: "2",
    title: "Hướng dẫn viết Reading",
    image:
      "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
    link: "/ielts-reading-guide",
    dateCreated: "2024-05-02T11:30:00.000Z",
    status: "published",
    position: 2,
  },
  {
    id: "3",
    title: "Khóa học IELTS mới",
    image:
      "https://cms.youpass.vn/assets/2391ddd1-deb2-451e-b1d1-c2f519badba2?width=1000",
    link: "/khoa-hoc-ielts-moi",
    dateCreated: "2024-05-03T09:15:00.000Z",
    status: "draft",
    position: 3,
  },
];
