
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ScamSlayer from "./pages/ScamSlayer";
import ScamScenario from "./pages/ScamScenario";
import SafeZone from "./pages/SafeZone";
import Leaderboard from "./pages/Leaderboard";
import Stories from "./pages/Stories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scam-slayer" element={<ScamSlayer />} />
            <Route path="/scam-slayer/:scenarioId" element={<ScamScenario />} />
            <Route path="/safezone" element={<SafeZone />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
