import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Schedule from "@/pages/Schedule";
import ClientForm from "@/pages/ClientForm";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ServicesStartupOperations from "@/pages/ServicesStartupOperations";
import ServicesCorporateStrategy from "@/pages/ServicesCorporateStrategy";
import ServicesAiAutomation from "@/pages/ServicesAiAutomation";
import AboutManuelDipres from "@/pages/AboutManuelDipres";
import IndustriesWestMichigan from "@/pages/IndustriesWestMichigan";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { LeaChat } from "./components/LeaChat";
import Home from "./pages/Home";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/schedule"} component={Schedule} />
      <Route path={"/client_form"} component={ClientForm} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/services/startup-operations"} component={ServicesStartupOperations} />
      <Route path={"/services/corporate-strategy"} component={ServicesCorporateStrategy} />
      <Route path={"/services/ai-automation"} component={ServicesAiAutomation} />
      <Route path={"/about/manuel-dipres"} component={AboutManuelDipres} />
      <Route path={"/industries/west-michigan"} component={IndustriesWestMichigan} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieConsentBanner />
            <LeaChat />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
