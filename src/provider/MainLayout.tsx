import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import NotificationEvent from "@/feature/comments/components/NotificationEvent";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 10 seconds
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function MainProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="flex min-h-screen flex-col">
          <TooltipProvider>
            {children}
            <Toaster />
            <NotificationEvent />
          </TooltipProvider>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
