import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboardPage from "./pages/AdminDashboard";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/terms" element={<Terms />} />;
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />;
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="*" element={<h1 className="text-center mt-20">404 Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
