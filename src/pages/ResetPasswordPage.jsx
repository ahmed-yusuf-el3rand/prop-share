import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { Lock, Loader2 } from "lucide-react";
import { usePasswordReset } from "../hooks/auth/useResetPassword";
import { useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";

const ResetPasswordPage = () => {
  const { goToLogin } = useNavigation();
  const {
    isLoading,
    isSuccess,
    handleSubmit,
    handleChange,
    formData,
    error,
    message,
  } = usePasswordReset();

  useEffect(() => {
    if (!isSuccess) return;

    const timer = setTimeout(() => {
      goToLogin();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSuccess, goToLogin]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="bg-white p-6 sm:p-8 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">
              Updating your password...
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="bg-white p-6 sm:p-8 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4 sm:mb-6 text-center">
              {message}
            </h1>
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">
              Redirecting you to the login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white p-6 sm:p-8 w-full max-w-3xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-7">
          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="********"
            icon={Lock}
            required
            autoFocus
          />
          <InputField
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="********"
            icon={Lock}
            required
          />
          <Button
            type="submit"
            className="w-full bg-yellow-300 hover:bg-yellow-500"
            disabled={isLoading}
          >
            Update
          </Button>
          {error && (
            <p className="text-red-600 text-sm sm:text-base text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
