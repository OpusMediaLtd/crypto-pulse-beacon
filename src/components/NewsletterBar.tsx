
import { useState } from "react";
import { X } from "lucide-react";

const NewsletterBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-purple-700 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 text-center sm:text-left">
          <span className="mr-2">
            Subscribe to our monthly newsletter for crypto insights
          </span>
          <a 
            href="#newsletter-form" 
            className="underline font-medium hover:text-purple-200 transition-colors"
          >
            Sign up now
          </a>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-purple-200 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default NewsletterBar;
