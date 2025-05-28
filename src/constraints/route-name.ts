export enum RouteNames {
  EMPTY = "",
  NotFound = "*",
  Error = "/error",
  Unauthorized = "/unauthorized",
  Dashboard = "/dashboard",
  Home = "/",
  Admin = "/admin",
  Teacher = "/teacher",
  SignIn = "/sign-in",

  // Admin
  AdminUsers = "/admin/users",
  AdminUserDetail = "/admin/users/:id",
  AdminUserCreate = "/admin/users/create",
  AdminUserUpdate = "/admin/users/update/:id",
  AdminArticles = "/admin/articles",
  AdminArticleDetail = "/admin/articles/:id",
  AdminArticleCreate = "/admin/articles/create",
  AdminArticleUpdate = "/admin/articles/update/:id",
  AdminNotification = "/admin/notifications",
  AdminLessons = "/admin/lessons",
  AdminRevenue = "/admin/revenue",

  // Settings
  AdminSettings = "/admin/settings",
  AdminSettingsProfile = "/admin/",
  AdminSettingsAppearance = "/admin/settings/appearance",
  AdminNotificationSettings = "/admin/settings/notifications",
  AdminHistory = "/admin/settings/history",
  AdminPayment = "/admin/settings/payment",

  // Teacher
  TeacherSettings = "/teacher/settings",
  TeacherSettingsProfile = "/teacher/settings/profile",
  TeacherSettingsAppearance = "/teacher/settings/appearance",
  TeacherNotificationSettings = "/teacher/settings/notifications",
  TeacherHistory = "/teacher/settings/history",
  TeacherPayment = "/teacher/settings/payment",

  TeacherLessonShowAll = "/teacher/lesson/show-all",

  TeacherWritingCreate = "/teacher/writing/create",
  TeacherWritingShowAll = "/teacher/writing/show-all",
  TeacherWritingGrading = "/teacher/writing/grading",
  TeacherWritingGradingDetail = "/teacher/writing/grading/:id",
  TeacherWritingUpdate = "/teacher/writing/:id/update",
  TeacherWritingGradingUpdate = "/teacher/writing/grading/:submissionId/update",
  WritingDetail = "/lesson/writing/:id",
  WritingResultDetail = "/lesson/writing/grading/:id",

  TeacherSpeakingCreate = "/teacher/speaking/create",
  TeacherSpeakingShowAll = "/teacher/speaking/show-all",
  TeacherSpeakingGrading = "/teacher/speaking/grading",
  TeacherSpeakingGradingDetail = "/teacher/speaking/grading/:id",
  TeacherSpeakingUpdate = "/teacher/speaking/:id/update",
  TeacherSpeakingDetail = "/teacher/speaking/:id",
  SpeakingDetail = "/lesson/speaking/:id",

  TeacherListeningCreate = "/teacher/listening/create",
  TeacherListeningShowAll = "/teacher/listening/show-all",
  TeacherListeningUpdate = "/teacher/listening/:id/update",
  ListeningDetail = "/lesson/listening/:id",

  TeacherReadingCreate = "/teacher/reading/create",
  TeacherReadingShowAll = "/teacher/reading/show-all",
  TeacherReadingUpdate = "/teacher/reading/:id/update",
  ReadingDetail = "/lesson/reading/:id",
}

export function replaceRouteName(
  routeName: RouteNames,
  params: Record<string, string>,
) {
  console.log(routeName, params);
  return routeName.replace(/:id/g, params.id);
}

//example
// const routeName = RouteNames.WritingAgentDetail;
// const params = { id: "123" };
// const newRouteName = replaceRouteName(routeName, params);
// console.log(newRouteName); // "/writing-agent/detail/123"
