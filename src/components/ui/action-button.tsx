
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const ActionButton = ({
  icon: Icon,
  variant = "primary",
  size = "default",
  children,
  className,
  ...props
}: ActionButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-dark-primary hover:bg-dark-primary/90 text-black font-medium";
      case "secondary":
        return "bg-[#1d365c] hover:bg-[#1d365c]/90 text-white font-medium";
      case "outline":
        return "border-[#1d365c] bg-transparent hover:bg-[#1d365c]/10 text-[#1d365c] font-medium";
      case "destructive":
        return "bg-red-600 hover:bg-red-700 text-white font-medium";
      default:
        return "bg-dark-primary hover:bg-dark-primary/90 text-black font-medium";
    }
  };

  return (
    <Button
      className={cn(getVariantClasses(), "flex items-center gap-2", className)}
      size={size}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Button>
  );
};

export default ActionButton;
