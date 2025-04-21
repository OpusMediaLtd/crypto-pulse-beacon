
import { Casino } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CasinoCardProps {
  casino: Casino;
}

const CasinoCard = ({ casino }: CasinoCardProps) => {
  return (
    <Card className="border-l-4 border-l-purple-600 flex flex-col md:flex-row overflow-hidden">
      <div className="flex items-center justify-center p-4 md:w-24 bg-gray-100">
        <div className="text-3xl font-bold text-purple-700">#{casino.acf.rank}</div>
      </div>
      <div className="md:w-1/4 p-4 flex items-center justify-center bg-white">
        <img 
          src={casino.acf.image_url || "/placeholder.svg"} 
          alt={casino.acf.name} 
          className="max-h-24 object-contain"
        />
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="text-xl font-bold mb-2">{casino.acf.name}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2">{casino.acf.description}</p>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => window.open(casino.acf.affiliate_link, "_blank", "noopener,noreferrer")}
        >
          Visit Casino
        </Button>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
