
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExpenseForm from "./ExpenseForm";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import { Trip, Expense } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface ExpenseTrackerProps {
  trip: Trip;
  onReset: () => void;
}

const ExpenseTracker = ({ trip, onReset }: ExpenseTrackerProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadExpenses();
  }, [trip.id]);

  const loadExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('trip_id', trip.id)
        .order('date', { ascending: false });

      if (error) throw error;

      setExpenses(data.map(exp => ({
        ...exp,
        date: new Date(exp.date)
      })));
    } catch (error: any) {
      console.error('Error loading expenses:', error.message);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'trip_id'>) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert({
          trip_id: trip.id,
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
          date: expense.date.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      const newExpense: Expense = {
        ...data,
        date: new Date(data.date)
      };

      setExpenses([newExpense, ...expenses]);
      toast({
        title: "Expense Added",
        description: `${expense.amount} added for ${expense.category}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
            <p className="text-gray-600">
              {format(trip.start_date, 'PPP')} - {format(trip.end_date, 'PPP')}
            </p>
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
