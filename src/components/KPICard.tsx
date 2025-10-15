// src/components/KPICard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative"; // Tambahkan prop baru
  icon: LucideIcon;
  variant?: "default" | "success" | "destructive";
}

export function KPICard({ title, value, change, changeType, icon: Icon, variant = "default" }: KPICardProps) {
  const variantStyles = {
    default: "border-primary/20",
    success: "border-green-500/20",
    destructive: "border-red-500/20",
  };

  const iconStyles = {
    default: "text-primary",
    success: "text-green-600",
    destructive: "text-red-600",
  };

  // Tentukan warna change berdasarkan changeType
  const changeColor = changeType === "positive" 
    ? "text-green-600" 
    : changeType === "negative" 
    ? "text-red-600" 
    : "text-muted-foreground";

  return (
    <Card className={cn("shadow-lg", variantStyles[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", iconStyles[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn("text-xs mt-1 font-medium", changeColor)}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}