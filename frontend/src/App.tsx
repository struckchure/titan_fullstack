import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import IndexPage from "./page/index";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IndexPage />
    </QueryClientProvider>
  );
}
