import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import { Shield, School } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/footer";
import { globalConfig } from "@/config";
import { ROLES } from "@/constraints";
export default function WelcomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">{globalConfig.APP_NAME}</CardTitle>
          <CardDescription>
            Chào mừng đến với {globalConfig.APP_NAME}. Vui lòng chọn vai trò để tiếp tục.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Link to={`${RouteNames.SignIn}?role=${ROLES.ADMIN}`} className="w-full">
              <Button
                variant="outline"
                className="w-full h-16 flex items-center justify-start gap-3 hover:bg-slate-100 hover:border-primary dark:hover:bg-slate-800"
              >
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <div className="font-medium">Administrator</div>
                  <div className="text-xs text-muted-foreground">Quản lý người dùng và cài đặt hệ thống</div>
                </div>
              </Button>
            </Link>

            <Link to={`${RouteNames.SignIn}?role=${ROLES.TEACHER}`} className="w-full">
              <Button
                variant="outline"
                className="w-full h-16 flex items-center justify-start gap-3 hover:bg-slate-100 hover:border-primary dark:hover:bg-slate-800"
              >
                <School className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <div className="font-medium">Teacher</div>
                  <div className="text-xs text-muted-foreground">Truy cập lớp học và bài tập</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Footer />
        </CardFooter>
      </Card>
    </div>
  );
}
