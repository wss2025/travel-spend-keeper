
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Expense } from "@/types/types";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No expenses recorded yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Recent Expenses</h3>
      <div className="space-y-2">
        {expenses.map((expense, index) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100"
          >
            <div>
              <p className="font-medium text-gray-800">{expense.category}</p>
              <p className="text-sm text-gray-500">{expense.description || 'No description'}</p>
              <p className="text-xs text-gray-400">{format(expense.date, 'PPP')}</p>
            </div>
            <p className="text-lg font-semibold text-purple-600">${expense.amount.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
