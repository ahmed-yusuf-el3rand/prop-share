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
import ResetPasswordPage from "./pages/ResetPasswordPage";
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
        <Route path="/prop-share" element={<HomePage />} />
        <Route path="/prop-share/home" element={<HomePage />} />
        <Route path="/prop-share/properties/:id" element={<PropertyPage />} />
        <Route path="/prop-share/explore" element={<ExplorePage />} />
        <Route element={<AuthRoute />}>
          <Route path="/prop-share/login" element={<LoginPage />} />
          <Route path="/prop-share/signup" element={<SignupPage />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/prop-share/dashboard" element={<DashboardPage />} />
        {/* </Route> */}
        <Route path="/prop-share/verify-email" element={<VerifyEmailPage />} />
        <Route path="/prop-share/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/prop-share/reset-password" element={<ResetPasswordPage />} />
        <Route path="/prop-share/terms" element={<TermsPage />} />
        <Route path="/prop-share/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/prop-share/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
