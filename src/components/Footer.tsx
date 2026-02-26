import { Hammer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Hammer className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">GramSetu</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/workers" className="hover:text-foreground transition-colors">{t.findWorkers}</Link>
            <Link to="/jobs" className="hover:text-foreground transition-colors">{t.jobBoard}</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">{t.register}</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">{t.dashboard}</Link>
          </nav>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            {t.madeWith} <Heart className="h-3 w-3 text-primary" /> {t.forRuralIndia}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
