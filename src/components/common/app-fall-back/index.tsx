import AppIcon from "@/components/common/app-icon";

export function AppFallback() {
  return (
    <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center">
        <AppIcon icon="spinner" className="mr-2 size-4 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  )
}
