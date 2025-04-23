
import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Cryptopulse</h3>
            <p className="text-muted-foreground text-sm">
              Your daily source for crypto news, insights, and casino toplists. Stay ahead of the market with our expert analysis and recommendations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/casino/top-list" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Casino Toplists
                </Link>
              </li>
            </ul>
          </div>
          <div id="newsletter-form">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our monthly newsletter for the latest crypto news and insights.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cryptopulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
