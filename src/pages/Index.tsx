
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TripSetup from "@/components/TripSetup";
import ExpenseTracker from "@/components/ExpenseTracker";
import { Trip } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ full_name: string | null } | null>(null);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Travel Expense Tracker
            </h1>
            <p className="text-gray-600">
              Welcome, {profile?.full_name || 'Traveler'}! Ready to track your expenses?
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-white hover:bg-gray-100"
          >
            Sign Out
          </Button>
        </div>

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
