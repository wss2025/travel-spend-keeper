
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExpenseForm from "./ExpenseForm";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import { Trip, Expense } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

interface ExpenseTrackerProps {
  trip: Trip;
  onReset: () => void;
}

const ExpenseTracker = ({ trip, onReset }: ExpenseTrackerProps) => {
  const [expenses, setExpenses] = useState<Expense[]>(trip.expenses);
  const { toast } = useToast();

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    toast({
      title: "Expense Added",
      description: `${expense.amount} added for ${expense.category}`,
    });
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = trip.budget - totalSpent;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{trip.destination}</h2>
            <p className="text-gray-600">Track your expenses</p>
          </div>
          <Button variant="outline" onClick={onReset}>
            End Trip
          </Button>
        </div>

        <ExpenseSummary
          budget={trip.budget}
          spent={totalSpent}
          remaining={remainingBudget}
        />

        <div className="mt-6">
          <ExpenseForm categories={trip.categories} onSubmit={addExpense} />
        </div>

        <div className="mt-6">
          <ExpenseList expenses={expenses} />
        </div>
      </Card>
    </motion.div>
  );
};

export default ExpenseTracker;
