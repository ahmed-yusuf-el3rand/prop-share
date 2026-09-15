import "./index.css";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TermsPage from "./pages/TermsPage";
import SignupPage from "./pages/SignUpPage";
import ExplorePage from "./pages/ExplorePage";
import Navbar from "./components/layout/Navbar";
import PropertyPage from "./pages/PropertyPage";
import Footer from "./components/layout/Footer";
import DashboardPage from "./pages/DashboardPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import PasswordResetPage from "./pages/PasswordResetPage";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/properties/:id" element={<PropertyPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<DashboardPage />} />
        {/* </Route> */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
