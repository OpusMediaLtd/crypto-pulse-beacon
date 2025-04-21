
import { Link } from "react-router-dom";
import PriceTicker from "./PriceTicker";
import NewsletterBar from "./NewsletterBar";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <NewsletterBar />
        <div className="py-5 flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-3xl font-bold mb-4 md:mb-0 text-primary">
            <span className="font-mono tracking-tight">Crypto</span>
            <span>pulse</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-secondary/50 text-foreground border border-border/50 rounded-full py-2 pl-10 pr-4 w-[200px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            <nav className="flex space-x-6 text-sm font-medium">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/casino/top-list" className="text-foreground hover:text-primary transition-colors">
                Casino Toplists
              </Link>
            </nav>
          </div>
        </div>
        <div className="py-2 overflow-hidden bg-secondary/30 rounded-md">
          <PriceTicker />
        </div>
      </div>
    </header>
  );
};

export default Header;
