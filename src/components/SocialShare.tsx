
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare = ({ title, url }: SocialShareProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-[#1DA1F2] hover:bg-[#0d8ddb]",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#3b5998] hover:bg-[#2d4373]",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0077b5] hover:bg-[#00669c]",
    },
    {
      name: "Reddit",
      url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "bg-[#FF5700] hover:bg-[#e54d00]",
    },
  ];

  return (
    <div className="social-share">
      <h3 className="text-lg font-medium mb-2">Share this article</h3>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            className={`${link.color} text-white`}
            onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
            type="button"
            size="sm"
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
