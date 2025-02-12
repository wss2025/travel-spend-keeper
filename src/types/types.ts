
export interface Trip {
  id: string;
  destination: string;
  budget: number;
  startDate: Date;
  expenses: Expense[];
  categories: string[];
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}
