
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trip } from "@/types/types";
import { format } from "date-fns";

interface TripSetupProps {
  onTripCreate: (trip: Trip) => void;
}

const TripSetup = ({ onTripCreate }: TripSetupProps) => {
  const { toast } = useToast();
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !budget || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const trip: Trip = {
      id: Date.now().toString(),
      destination,
      budget: parseFloat(budget),
      startDate: date,
      expenses: [],
      categories: ["Food", "Transport", "Accommodation", "Activities", "Other"],
    };

    onTripCreate(trip);
    toast({
      title: "Trip Created",
      description: "You can now start tracking your expenses",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your budget"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
            Create Trip
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default TripSetup;
