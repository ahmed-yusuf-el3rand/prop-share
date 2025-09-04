import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InvestorDashboard from "./pages/InvestorDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
        <Route path="/terms" element={<Terms />} />;
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />;
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route
          path="*"
          element={<h1 className="text-center mt-20">404 Not Found</h1>}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
