
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expense } from "@/types/types";

interface ExpenseFormProps {
  categories: string[];
  onSubmit: (expense: Expense) => void;
}

const ExpenseForm = ({ categories, onSubmit }: ExpenseFormProps) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(),
    };

    onSubmit(expense);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full"
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;
