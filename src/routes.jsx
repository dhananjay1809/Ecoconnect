import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

import ClothDonationPage from "./pages/ClothDonation/ClothDonationPage";
import FoodDonationPage from "./pages/FoodDonation/FoodDonationPage";
import GarbageCleanerPage from "./pages/GarbageCleaner/GarbageCleanerPage";
import AnimalRescuePage from "./pages/AnimalRescue/AnimalRescuePage";
import ReportsList from "./pages/ReportsList"; // if you have one

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cloth-donation" element={<ClothDonationPage />} />
        <Route path="/food-donation" element={<FoodDonationPage />} />
        <Route path="/garbage-cleaner" element={<GarbageCleanerPage />} />
        <Route path="/animal-rescue" element={<AnimalRescuePage />} />
        <Route path="/reports" element={<ReportsList />} />
      </Routes>
    </Router>
  );
}
