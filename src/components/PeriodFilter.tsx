import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface PeriodFilterProps {
  period: Period;
  onChange: (period: Period) => void;
}

export function PeriodFilter({ period, onChange }: PeriodFilterProps) {
  const periods: { value: Period; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="flex gap-2">
      {periods.map((p) => (
        <Button
          key={p.value}
          variant={period === p.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(p.value)}
          className={cn(
            "transition-all",
            period === p.value && "shadow-sm"
          )}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
}
