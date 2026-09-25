// src/components/BuggyComponent.jsx
import { useState } from "react";

function BuggyComponent() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    // Deliberate error thrown during render
    throw new Error("Test Crash: Error Boundary caught this!");
  }

  return (
    <div className="p-4 border rounded text-center">
      <button
        onClick={() => setCrash(true)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Trigger Crash
      </button>
    </div>
  );
}

export default BuggyComponent;