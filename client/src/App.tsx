import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components & Pages
import { Layout } from "@/components/Layout";
import Home from "@/pages/home";
import ArticlePage from "@/pages/article";
import ContatoPage from "@/pages/compliance/contato";
import SuportePage from "@/pages/compliance/suporte";
import CookiesPage from "@/pages/compliance/cookies";
import TermosPage from "@/pages/compliance/termos";
import PrivacidadePage from "@/pages/compliance/privacidade";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/article/:slug" component={ArticlePage} />
        <Route path="/contato" component={ContatoPage} />
        <Route path="/suporte" component={SuportePage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route path="/termos" component={TermosPage} />
        <Route path="/privacidade" component={PrivacidadePage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
