import { useAuth } from "../../context/auth/useAuth";
import Button from "../../components/common/buttons/Button";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const JoinSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleSignUpButton = () => {
    navigate("/signup");
  };

  return (
    <section className="py-12 px-4 text-gray-800  text-center bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Start Building Your Portfolio Now
        </h2>
        <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
          Join thousands of smart investors leveraging fractional ownership.
        </p>
        <div className="flex justify-center">
          {!isLoggedIn && (
            <Button
              onClick={handleSignUpButton}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-full shadow-lg w-full max-w-xs bg-cyan-600 hover:bg-cyan-700"
              icon={User}
            >
              Sign Up Now
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
