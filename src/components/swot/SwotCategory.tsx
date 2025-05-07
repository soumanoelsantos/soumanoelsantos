
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { SwotItem } from "@/types/swot";

interface SwotCategoryProps {
  title: string;
  description: string;
  color: string; // bg color class
  headerColor: string; // header bg color class
  items: SwotItem[];
  category: string;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onItemChange: (id: string, value: string) => void;
  placeholder: string;
}

const SwotCategory: React.FC<SwotCategoryProps> = ({
  title,
  description,
  color,
  headerColor,
  items,
  category,
  onAddItem,
  onRemoveItem,
  onItemChange,
  placeholder
}) => {
  return (
    <Card className={`${color} border-${color.replace('bg-', 'border-')}`}>
      <CardHeader className={headerColor}>
        <CardTitle className="text-lg text-gray-800">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2">
            <Textarea 
              value={item.text}
              onChange={(e) => onItemChange(item.id, e.target.value)}
              placeholder={placeholder}
              className="min-h-[80px] bg-white"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemoveItem(item.id)}
              className="h-10 w-10 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button 
          variant="outline" 
          onClick={onAddItem}
          className="w-full mt-2"
        >
          Adicionar {category.toLowerCase()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SwotCategory;
