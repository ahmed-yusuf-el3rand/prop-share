import { useState, useRef } from "react";
import { Lock, Edit } from "lucide-react";
import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";
import { validatePassword } from "../../utils/validation";

const PasswordForm = () => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const oldPwd = oldPasswordRef.current.value.trim();
    const newPwd = newPasswordRef.current.value.trim();
    const confirmPwd = confirmPasswordRef.current.value.trim();

    if (!oldPwd) {
      setError("Please enter your current password.");
      return;
    }

    // Use your helper if available
    if (!validatePassword(newPwd)) {
      setError("New password must be at least 8 characters and secure.");
      return;
    }

    if (newPwd !== confirmPwd) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    // TODO: Replace timeout with real API call
    setTimeout(() => {
      setLoading(false);
      setMessage("Password updated successfully.");
      // Clear fields manually since we're using refs
      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }, 700);
  };

  return (
    <div className="mb-6 sm:mb-8 border-b pb-4 sm:pb-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        <Lock size={20} /> Change Password
      </h3>

      <form onSubmit={handleChangePassword} noValidate>
        <InputField
          label="Old Password"
          type="password"
          ref={oldPasswordRef}
          placeholder="Enter old password"
          icon={Lock}
          required
          disabled={loading}
        />
        <InputField
          label="New Password"
          type="password"
          ref={newPasswordRef}
          placeholder="Enter new password"
          icon={Lock}
          required
          disabled={loading}
        />
        <InputField
          label="Confirm New Password"
          type="password"
          ref={confirmPasswordRef}
          placeholder="********"
          icon={Lock}
          required
          disabled={loading}
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
          className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
          icon={Edit}
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;
