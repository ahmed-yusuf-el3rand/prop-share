import { Lock } from "lucide-react";
import Button from "../../../components/common/Button";
import InputField from "../../../components/common/InputField";
import { usePassword } from "../../../hooks/dashboard/settingsTab/usePassword";

const PasswordForm = () => {
  const {
    error,
    message,
    updating,
    oldPasswordRef,
    newPasswordRef,
    confirmPasswordRef,
    handleChangePassword,
  } = usePassword();

  return (
    <div className="mb-6 sm:mb-8 pb-4 sm:pb-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        Change Password
      </h3>
      <form onSubmit={handleChangePassword} noValidate>
        <InputField
          label="Old Password"
          type="password"
          ref={oldPasswordRef}
          placeholder="Enter old password"
          icon={Lock}
          required
          disabled={updating}
        />
        <InputField
          label="New Password"
          type="password"
          ref={newPasswordRef}
          placeholder="Enter new password"
          icon={Lock}
          required
          disabled={updating}
        />
        <InputField
          label="Confirm New Password"
          type="password"
          ref={confirmPasswordRef}
          placeholder="********"
          icon={Lock}
          required
          disabled={updating}
        />
        {error && (
          <p className="text-red-600 text-sm mb-4" aria-live="assertive">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 text-sm mb-4" aria-live="polite">
            {message}
          </p>
        )}
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={updating}
        >
          {updating ? "updating..." : "change Password"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;
