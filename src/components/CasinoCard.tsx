
import { Casino } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LazyImage from "./LazyImage";

interface CasinoCardProps {
  casino: Casino;
}

const CasinoCard = ({ casino }: CasinoCardProps) => {
  return (
    <Card className="border-l-4 border-l-primary flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-center p-4 md:w-24 bg-secondary/30">
        <div className="text-3xl font-bold text-primary font-mono">#{casino.acf.rank}</div>
      </div>
      <div className="md:w-1/4 p-4 flex items-center justify-center bg-card">
        <LazyImage 
          src={casino.acf.image_url || "/placeholder.svg"}
          alt={casino.acf.name}
          className="max-h-24 object-contain"
          placeholderHeight="h-24"
        />
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="text-xl font-bold mb-2">{casino.acf.name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{casino.acf.description}</p>
        <Button 
          className="bg-primary hover:bg-primary/80"
          onClick={() => window.open(casino.acf.affiliate_link, "_blank", "noopener,noreferrer")}
        >
          Visit Casino
        </Button>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
