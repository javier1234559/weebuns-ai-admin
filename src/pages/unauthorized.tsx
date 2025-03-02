import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    navigate(RouteNames.Home);
  };

  const handleGoBack = () => {
    navigate(-2);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-card-foreground">
          Unauthorized
        </h1>

        <p className="text-muted-foreground mb-6">
          You are not authorized to access this page. Please try with another
          account that has appropriate permissions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Button
            variant="destructive"
            className="gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
