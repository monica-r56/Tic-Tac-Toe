import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguageSelector from "./components/LanguageSelector";
import English from "./language/en.json";
import French from "./language/fr.json";
import German from "./language/de.json";

const messages: Record<string,any> = {
  en: English,
  fr: French,
  de: German,
};

const queryClient = new QueryClient();

const App = () => {
  let browserLang: string;
  switch (true) {
    case navigator.language.startsWith("fr"):
      browserLang = "fr";
      break;
    case navigator.language.startsWith("de"):
      browserLang = "de";
      break;
    default:
      browserLang = "en";
  }

  const [locale, setLocale] = useState(browserLang);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <IntlProvider locale={locale} messages={messages[locale]}>
          <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            <LanguageSelector currentLang={locale} onChangeLanguage={setLocale} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </IntlProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
