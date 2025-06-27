
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import FileUpload from "@/pages/FileUpload";
import TaskCoPilot from "@/pages/TaskCoPilot";
import ResultsExplorer from "@/pages/ResultsExplorer";
import DataChat from "@/pages/DataChat";
import AuditTrail from "@/pages/AuditTrail";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/copilot" element={<TaskCoPilot />} />
              <Route path="/results" element={<ResultsExplorer />} />
              <Route path="/chat" element={<DataChat />} />
              <Route path="/audit" element={<AuditTrail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
