
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Trip } from "@/types/types";
import { Book, DollarSign } from "lucide-react";

interface TripWithExpenses extends Trip {
  total_expenses: number;
}

const TravelHistory = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<TripWithExpenses[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTripHistory();
  }, [user?.id]);

  const loadTripHistory = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      // Fetch trips and their total expenses
      const { data: tripsData, error: tripsError } = await supabase
        .from('trips')
        .select(`
          *,
          expenses:expenses(amount)
        `)
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (tripsError) throw tripsError;

      const tripsWithTotals: TripWithExpenses[] = tripsData.map(trip => ({
        ...trip,
        start_date: new Date(trip.start_date),
        end_date: new Date(trip.end_date),
        expenses: trip.expenses || [],
        categories: ["Food", "Transport", "Accommodation", "Activities", "Other"],
        total_expenses: trip.expenses
          ? trip.expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)
          : 0
      }));

      setTrips(tripsWithTotals);
    } catch (error: any) {
      console.error('Error loading trip history:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading travel history...</div>;
  }

  if (trips.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No travel history found. Start a new trip to track your expenses!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Travel History</h2>
      {trips.map((trip) => (
        <Card key={trip.id} className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="expenses" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Expenses
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {trip.destination}
                  </h3>
                  <p className="text-gray-600">
                    {format(trip.start_date, 'PPP')} - {format(trip.end_date, 'PPP')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${trip.budget.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className={`text-lg font-semibold ${
                      trip.total_expenses > trip.budget ? 'text-red-500' : 'text-green-500'
                    }`}>
                      ${trip.total_expenses.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="expenses" className="mt-4">
              <div className="space-y-4">
                {trip.expenses.length > 0 ? (
                  trip.expenses.map((expense: any) => (
                    <div
                      key={expense.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{expense.category}</p>
                        <p className="text-sm text-gray-500">{expense.description || 'No description'}</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(expense.date), 'PPP')}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-purple-600">
                        ${expense.amount.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No expenses recorded for this trip
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      ))}
    </div>
  );
};

export default TravelHistory;
