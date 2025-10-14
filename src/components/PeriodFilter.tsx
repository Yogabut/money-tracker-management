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
    <div className="flex gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
      {periods.map((p) => (
        <Button
          key={p.value}
          variant={period === p.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(p.value)}
          className={cn(
            "transition-all flex-1 min-w-[70px] sm:min-w-0 text-xs sm:text-sm",
            period === p.value && "shadow-sm"
          )}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
}