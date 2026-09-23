import { useState } from "react";
import { supabase } from "../lib/supabase";

function AddHabit({ userId, onHabitAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Insert record and return the created row using .select().single()
    const { data, error } = await supabase
      .from("habits")
      .insert([{ name: name.trim(), user_id: userId }])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      onHabitAdded(data);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="New habit..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}

export default AddHabit;