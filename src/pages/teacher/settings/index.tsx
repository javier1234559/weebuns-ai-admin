import { Navigate } from "react-router-dom";
import { RouteNames } from "@/constraints/route-name";

export default function Page() {
  return <Navigate to={RouteNames.TeacherSettingsProfile} />;
}
