import { buttonVariants } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
 <Routes>
      <Route path="/login" element={< Login/>} />
      <Route path="*" element={<div className="p-4 text-center text-gray-700">404 - Page not found</div>} />
    </Routes>
  );
}

export default App;
