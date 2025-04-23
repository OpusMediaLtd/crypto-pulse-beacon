
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const NewsletterBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary/5 border-b border-border w-full">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 w-full">
        <div className="flex-1 flex items-center justify-center sm:justify-start gap-3">
          <p className="text-sm text-foreground/90">
            Get monthly crypto insights in your inbox
          </p>
          <Button 
            variant="link" 
            className="text-primary font-medium p-0 h-auto hover:no-underline"
            asChild
          >
            <a href="#newsletter-form">
              Subscribe now
            </a>
          </Button>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-foreground/50 hover:text-foreground/70 transition-colors p-1.5 hover:bg-primary/5 rounded-full"
          aria-label="Close newsletter banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default NewsletterBar;
