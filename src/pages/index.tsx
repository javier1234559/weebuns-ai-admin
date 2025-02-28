import AppIcon from "@/components/common/app-icon";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Welcome to the Admin Dashboard</h1>
      <p className="text-lg">Go to <Link to={RouteNames.SignIn}>Login</Link> page</p>
      <Button variant="outline">
        <Link to={RouteNames.Admin}>
          <AppIcon icon="admin" />
          Admin
        </Link>
      </Button>
      <Button variant="outline">
        <Link to={RouteNames.Teacher}>
          <AppIcon icon="teacher" />
          Teacher
        </Link>
      </Button>
    </div>
  );
}
