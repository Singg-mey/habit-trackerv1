import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import HabitTracker from "./HabitTracker";

function Dashboard() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!userId) return <p className="p-4">Loading session...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center max-w-md mx-auto mb-4">
        <span className="text-sm text-gray-600">Logged in</span>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Sign Out
        </button>
      </div>

      <HabitTracker userId={userId} />
    </div>
  );
}

export default Dashboard;