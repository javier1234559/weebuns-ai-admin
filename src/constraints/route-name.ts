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
  AdminUserEdit = "/admin/users/edit/:id",
  AdminArticles = "/admin/articles",
  AdminArticleDetail = "/admin/articles/:id",
  AdminArticleCreate = "/admin/articles/create",
  AdminArticleEdit = "/admin/articles/edit/:id",
  AdminNotification = "/admin/notifications",
  AdminLessons = "/admin/lessons",
  AdminRevenue = "/admin/revenue",

  // Settings
  AdminSettings = "/admin/settings",
  AdminSettingsProfile = "/admin/settings/profile",
  AdminSettingsAppearance = "/admin/settings/appearance",
  AdminNotificationSettings = "/admin/settings/notifications",
  AdminHistory = "/admin/settings/history",
  AdminPayment = "/admin/settings/payment",

  // Writing = "/lesson/writing",
  // WritingCreate = "/lesson/writing/create",
  // WritingEdit = "/lesson/writing/edit/:id",
  // WritingDetail = "/lesson/writing/detail/:id",

  // Vocabulary = "/lesson/vocabulary",
  // VocabularyCreate = "/lesson/vocabulary/create",
  // VocabularyEdit = "/lesson/vocabulary/edit/:id",
  // VocabularyDetail = "/lesson/vocabulary/detail/:id",

  // Speaking = "/lesson/speaking",
  // SpeakingCreate = "/lesson/speaking/create",
  // SpeakingEdit = "/lesson/speaking/edit/:id",
  // SpeakingDetail = "/lesson/speaking/detail/:id",

  // Reading = "/lesson/reading",
  // ReadingCreate = "/lesson/reading/create",
  // ReadingEdit = "/lesson/reading/edit/:id",
  // ReadingDetail = "/lesson/reading/detail/:id",

  // Listening = "/lesson/listening",
  // ListeningCreate = "/lesson/listening/create",
  // ListeningEdit = "/lesson/listening/edit/:id",
  // ListeningDetail = "/lesson/listening/detail/:id",
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
