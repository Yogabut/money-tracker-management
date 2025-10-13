import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'destructive';
}

export function KPICard({ title, value, change, icon: Icon, variant = 'default' }: KPICardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={cn(
                "text-xs font-medium",
                variant === 'success' && "text-success",
                variant === 'destructive' && "text-destructive"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "rounded-lg p-3",
            variant === 'success' && "bg-success/10",
            variant === 'destructive' && "bg-destructive/10",
            variant === 'default' && "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              variant === 'success' && "text-success",
              variant === 'destructive' && "text-destructive",
              variant === 'default' && "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
