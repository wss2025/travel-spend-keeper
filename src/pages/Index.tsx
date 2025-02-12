
import { useState } from "react";
import { motion } from "framer-motion";
import TripSetup from "@/components/TripSetup";
import ExpenseTracker from "@/components/ExpenseTracker";
import { Trip } from "@/types/types";

const Index = () => {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800">
          Travel Expense Tracker
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Keep track of your travel expenses and stay within budget
        </p>

        {!currentTrip ? (
          <TripSetup onTripCreate={setCurrentTrip} />
        ) : (
          <ExpenseTracker trip={currentTrip} onReset={() => setCurrentTrip(null)} />
        )}
      </motion.div>
    </div>
  );
};

export default Index;
