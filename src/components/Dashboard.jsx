// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ErrorBoundary from "./ErrorBoundary";
import UserStatus from "./UserStatus";
import AvatarUpload from "./AvatarUpload";
import HabitTracker from "./HabitTracker";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    // 1. Get authenticated user
    supabase.auth.getUser().then(({ data: authData, error: authError }) => {
      if (authError || !authData?.user) return;

      const currentUser = authData.user;
      setUser(currentUser);

      // 2. Fetch avatar_url from public.profiles
      supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", currentUser.id)
        .single()
        .then(({ data: profileData, error: profileError }) => {
          if (!profileError && profileData?.avatar_url) {
            setAvatarUrl(profileData.avatar_url);
          }
        });
    });
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-6">
      <ErrorBoundary sectionName="User Profile">
        <header className="flex flex-col items-center gap-4 bg-gray-800 p-6 rounded-xl">
          <UserStatus />
          {user && (
            <AvatarUpload
              userId={user.id}
              url={avatarUrl}
              onUpload={(newUrl) => setAvatarUrl(newUrl)}
            />
          )}
        </header>
      </ErrorBoundary>

      <main>
        <ErrorBoundary sectionName="Habit Tracker">
          <HabitTracker />
        </ErrorBoundary>
      </main>
    </div>
  );
}