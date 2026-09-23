// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import AuthForm from "./components/AuthForm";
import UserStatus from "./components/UserStatus";

function App() {
  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <AuthForm />
    // </div>

    // <UserStatus />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;