import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect straight to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      navigate("/dashboard"); // Redirect on successful login
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created! Logging in...");
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign In / Sign Up</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;