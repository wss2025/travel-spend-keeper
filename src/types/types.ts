
export interface Trip {
  id: string;
  user_id: string;
  destination: string;
  budget: number;
  start_date: Date;
  end_date: Date;
  expenses: Expense[];
  categories: string[];
}

export interface Expense {
  id: string;
  trip_id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}
