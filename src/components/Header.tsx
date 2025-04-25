
import { Link } from "react-router-dom";
import PriceTicker from "./PriceTicker";
import NewsletterBar from "./NewsletterBar";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto">
        <NewsletterBar />
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl font-bold mb-3 md:mb-0">
            <img 
              src="/cryptopulse-logo.svg" 
              alt="Cryptopulse" 
              className="h-12 md:h-16 w-auto" 
            />
          </Link>
          <div className="flex items-center gap-5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-background border border-border rounded-full py-1.5 pl-9 pr-4 w-[200px] text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            <nav className="space-x-5 text-sm font-medium">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/casino/top-list" className="text-foreground hover:text-primary transition-colors">
                Casino Toplists
              </Link>
            </nav>
          </div>
        </div>
        <div className="py-2 overflow-hidden rounded border border-border/30 mb-4">
          <PriceTicker />
        </div>
      </div>
    </header>
  );
};

export default Header;
