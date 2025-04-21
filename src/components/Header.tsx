
import { Link } from "react-router-dom";
import PriceTicker from "./PriceTicker";
import NewsletterBar from "./NewsletterBar";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <NewsletterBar />
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-3xl font-bold mb-4 md:mb-0">
            Cryptopulse
          </Link>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link to="/casino/top-list" className="hover:text-purple-400 transition-colors">
              Casino Toplists
            </Link>
          </nav>
        </div>
        <div className="py-2 overflow-hidden">
          <PriceTicker />
        </div>
      </div>
    </header>
  );
};

export default Header;
