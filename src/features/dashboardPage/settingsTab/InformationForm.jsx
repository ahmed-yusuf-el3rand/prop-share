import Button from "../../../components/common/Button";
import { User, Mail } from "lucide-react";
import InputField from "../../../components/common/InputField";
import { useUserInfo } from "../../../hooks/dashboard/settingsTab/useUserInfo";

const InformationForm = () => {
  const {
    formData,
    handleChange,
    handlePersonalInfo,
    message,
    error,
    data,
    updating,
  } = useUserInfo();

  return (
    <div className="mb-6 sm:mb-8 pb-4 sm:pb-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        Your Information
      </h3>
      <form onSubmit={handlePersonalInfo} noValidate>
        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          icon={User}
          required
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
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
          variant="secondary"
          className="w-full"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Info"}
        </Button>
      </form>
    </div>
  );
};

export default InformationForm;
