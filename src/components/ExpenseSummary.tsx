
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface ExpenseSummaryProps {
  budget: number;
  spent: number;
  remaining: number;
}

const ExpenseSummary = ({ budget, spent, remaining }: ExpenseSummaryProps) => {
  const spentPercentage = (spent / budget) * 100;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
          <p className="text-2xl font-semibold text-gray-900">${budget.toFixed(2)}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          <p className="text-2xl font-semibold text-purple-600">${spent.toFixed(2)}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Remaining</h3>
          <p className={`text-2xl font-semibold ${remaining < 0 ? 'text-red-500' : 'text-green-500'}`}>
            ${remaining.toFixed(2)}
          </p>
        </Card>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Budget Usage</span>
          <span>{spentPercentage.toFixed(1)}%</span>
        </div>
        <Progress value={spentPercentage} className="h-2" />
      </div>
    </div>
  );
};

export default ExpenseSummary;
