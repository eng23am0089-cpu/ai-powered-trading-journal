import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Trades from "./pages/Trades";
import Journal from "./pages/Journal";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import AIRecommendation from "./pages/AIRecommendation";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics />} />

        {/* Trades */}
        <Route path="/trades" element={<Trades />} />

        {/* Journal */}
        <Route path="/journal" element={<Journal />} />

        {/* Calendar */}
        <Route path="/calendar" element={<Calendar />} />

        {/* AI Recommendation */}
        <Route path="/ai" element={<AIRecommendation />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;