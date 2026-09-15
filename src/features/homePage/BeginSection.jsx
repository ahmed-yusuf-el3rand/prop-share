import { useAuth } from "../../context/auth/useAuth";
import Button from "../../components/common/buttons/Button";
import { useNavigation } from "../../hooks/useNavigation";
import { User } from "lucide-react";

const BeginSection = () => {
  const { goToSignup } = useNavigation();
  const { isLoggedIn } = useAuth();
  const handleSignUpButton = () => {
    goToSignup();
  };

  return (
    <section className="py-16 px-4 text-gray-800 text-center border-t-2 border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Begin with PropShare
        </h2>
        <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
           Scale your wealth through strategic fractional real estate ownership..
        </p>
        <div className="flex justify-center">
          {!isLoggedIn && (
            <Button
              onClick={handleSignUpButton}
              className="sm:px sm:py-3  sm:text-lg w-full max-w-xs"
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

export default BeginSection;
