// src/components/UserStatus.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function UserStatus() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      // Safely access response.data
      if (response?.data?.user) {
        setEmail(response.data.user.email);
      }
    });
  }, []);

  return (
    <div className="text-white text-center">
      <p className="text-sm text-gray-400">Logged in as:</p>
      <p className="font-semibold">{email || "Loading..."}</p>
    </div>
  );
}