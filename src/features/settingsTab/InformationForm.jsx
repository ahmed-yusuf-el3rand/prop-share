import { useState } from "react";
import Button from "../../components/common/buttons/Button";
import { Book, User, Mail, Edit } from "lucide-react";
import InputField from "../../components/common/InputField";
import { validateEmail, validateFullName } from "../../utils/validation";
import {useUserInfo} from "../../hooks/dashboard/settingsTab/useUserInfo"

const InformationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, updating } = useUserInfo();

  const handlePersonalInfo = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!validateFullName(trimmedName)) {
      setError("Please enter a valid name.");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage("Information updated successfully");
    }, 600);
  };

  return (
    <div className="mb-6 sm:mb-8 border-b pb-4 sm:pb-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        <Book size={20} /> Your Information
      </h3>

      <form onSubmit={handlePersonalInfo} noValidate>
        <InputField
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your Full Name"
          icon={User}
          required
        />

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@example.com"
          icon={Mail}
          required
        />

        {message && (
          <p className="text-green-600 text-sm mb-4" aria-live="polite">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-sm mb-4" aria-live="assertive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
          icon={Edit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Info"}
        </Button>
      </form>
    </div>
  );
};

export default InformationForm;
