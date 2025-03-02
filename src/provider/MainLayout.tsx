import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
      retryDelay: 1000,
    },
  },
});

export default function MainProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="flex min-h-screen flex-col">
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
    //   </PersistGate>
    // </Provider>
  );
}
