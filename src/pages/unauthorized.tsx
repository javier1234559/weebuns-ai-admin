import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return <div className="flex flex-col items-center justify-center h-full gap-4">
    <h1 className="text-4xl font-bold">Unauthorized</h1>
    <p className="text-lg">You are not authorized to access this page . Try to access with another account</p>
    <div className="flex gap-4">
      <Button variant="outline">
        <Link to={RouteNames.SignIn}>
          Login
        </Link>
      </Button>
      <Button >
        <Link to={RouteNames.Home}>
          Home
        </Link>
      </Button>
    </div>
  </div>;
}
