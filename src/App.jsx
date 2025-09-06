import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Property from "./pages/Property";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
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
        <Route path="/properties/:id" element={<Property />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
