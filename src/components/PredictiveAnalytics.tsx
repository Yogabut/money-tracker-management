import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle, Target } from "lucide-react";

interface PredictiveAnalyticsProps {
  totalIncome: number;
  totalExpense: number;
}

export function PredictiveAnalytics({ totalIncome, totalExpense }: PredictiveAnalyticsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const savingsRatio = ((totalIncome - totalExpense) / totalIncome) * 100;
  const predictedNextMonthExpense = totalExpense * 1.035;
  const predictedNextMonthIncome = totalIncome * 1.02;
  const potentialSavingsIncrease = totalExpense * 0.05;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Ratio</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{savingsRatio.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            You're saving {formatCurrency(totalIncome - totalExpense)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Month Prediction</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(predictedNextMonthExpense)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Expected expense (+3.5% trend)
          </p>
        </CardContent>
      </Card>

      <Card className="border-chart-income/20 bg-gradient-to-br from-chart-income/5 to-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income Forecast</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--chart-income))' }}>
            {formatCurrency(predictedNextMonthIncome)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Expected income next month (+2%)
          </p>
        </CardContent>
      </Card>

      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Potential</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-500">
            {formatCurrency(potentialSavingsIncrease)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            If you reduce expenses by 5%
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
