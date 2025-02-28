import AuthGuard from "@/provider/AuthProvider";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {children}
      </div>
    </div>
  </AuthGuard>;
}
