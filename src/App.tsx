import { buttonVariants } from "@/components/ui/button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div className="p-4 text-center text-gray-700">404 - Page not found</div>} />
      </Routes>
    
  );
}

export default App;
