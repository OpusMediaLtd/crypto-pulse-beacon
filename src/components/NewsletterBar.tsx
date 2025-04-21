
import { useState } from "react";
import { X } from "lucide-react";

const NewsletterBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary/20 text-foreground py-2 px-4 border-b border-border/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 text-center sm:text-left text-sm">
          <span className="mr-2">
            Subscribe to our monthly newsletter for crypto insights
          </span>
          <a 
            href="#newsletter-form" 
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Sign up now
          </a>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-foreground hover:text-primary transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default NewsletterBar;
