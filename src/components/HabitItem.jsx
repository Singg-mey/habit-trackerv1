import { useState } from "react";
import { supabase } from "../lib/supabase";

function HabitItem({ habit, onHabitUpdated, onHabitDeleted }) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(habit.name);

  // UPDATE operation
  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from("habits")
      .update({ name: newName.trim() })
      .eq("id", habit.id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error.message);
    } else {
      onHabitUpdated(data);
      setEditing(false);
    }
  };

  // DELETE operation
  const handleDelete = async () => {
    const { error } = await supabase
      .from("habits")
      .delete()
      .eq("id", habit.id);

    if (error) {
      console.error("Delete error:", error.message);
    } else {
      onHabitDeleted(habit.id);
    }
  };

  return (
    <li className="flex items-center gap-3 p-3 border rounded mb-2">
      {editing ? (
        <>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 border rounded p-1"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setNewName(habit.name);
            }}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="flex-1">{habit.name}</span>
          <button onClick={() => setEditing(true)} className="text-blue-500 px-2">
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-500 px-2">
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default HabitItem;