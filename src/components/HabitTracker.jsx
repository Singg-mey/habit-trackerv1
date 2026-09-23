import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AddHabit from "./AddHabit";
import HabitItem from "./HabitItem";

function HabitTracker({ userId }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ operation
  useEffect(() => {
    let cancelled = false;

    async function loadHabits() {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!cancelled) {
        if (error) console.error("Fetch error:", error.message);
        setHabits(data || []);
        setLoading(false);
      }
    }

    loadHabits();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Handler functions to update local UI state immediately
  const handleHabitAdded = (newHabit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };

  const handleHabitUpdated = (updated) => {
    setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  };

  const handleHabitDeleted = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  if (loading) return <p className="p-4">Loading habits...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Habits</h1>
      <AddHabit userId={userId} onHabitAdded={handleHabitAdded} />

      {habits.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No habits yet! Add one above.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onHabitUpdated={handleHabitUpdated}
              onHabitDeleted={handleHabitDeleted}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default HabitTracker;