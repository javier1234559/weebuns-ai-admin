import AppFallback from "@/components/common/app-fall-back";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background/80">
      <AppFallback />
    </div>
  );
}
