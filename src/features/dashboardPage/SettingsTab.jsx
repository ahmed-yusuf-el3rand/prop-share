import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { useSettings } from "../../hooks/useSettings";

import {
  Calendar,
  User,
  Lock,
  Mail,
  CreditCard,
  Edit,
  PlusCircle,
  Trash2,
  ShieldCheck,
  Book,
} from "lucide-react";

const SettingsTab = () => {
  const settings = useSettings({
    fullName: "ali",
    password: "123456",
    email: "",
    userType: "Client",
    paymentMethods: [],
  });
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 sm:mb-8 border-b pb-4 sm:pb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
          <Book size={20} /> Your Information
        </h3>
        <form onSubmit={settings.handlePersonalInfoSubmit}>
          <InputField
            label="Full Name"
            type="text"
            value={settings.fullName}
            onChange={(e) => settings.setFullName(e.target.value)}
            placeholder="Your Full Name"
            icon={User}
            required
          />
          <InputField
            label="Email"
            type="email"
            value={settings.email}
            onChange={(e) => settings.setEmail(e.target.value)}
            placeholder="your@example.com"
            icon={Mail}
            required
          />
          {settings.personalInfoMessage && (
            <p className="text-green-600 text-sm mb-4">
              {settings.personalInfoMessage}
            </p>
          )}
          <Button type="submit" className="w-full" icon={Edit}>
            Update Info
          </Button>
        </form>
      </div>

      <div className="mb-6 sm:mb-8 border-b pb-4 sm:pb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
          <Lock size={20} /> Change Password
        </h3>
        <form onSubmit={settings.handleChangePassword}>
          <InputField
            label="Old Password"
            type="password"
            value={settings.oldPassword}
            onChange={(e) => settings.setOldPassword(e.target.value)}
            placeholder="Enter old password"
            icon={Lock}
            required
          />
          <InputField
            label="New Password"
            type="password"
            value={settings.newPassword}
            onChange={(e) => settings.setNewPassword(e.target.value)}
            placeholder="Enter new password"
            icon={Lock}
            required
          />
          <InputField
            label="Confirm New Password"
            type="password"
            value={settings.confirmNewPassword}
            onChange={(e) => settings.setConfirmNewPassword(e.target.value)}
            placeholder="********"
            icon={Lock}
            required
          />
          {settings.passwordMessage && (
            <p className="text-red-600 text-sm mb-4">
              {settings.passwordMessage}
            </p>
          )}
          <Button type="submit" className="w-full" icon={Edit}>
            Change Password
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
          <CreditCard size={20} /> Payment Methods
        </h3>
        <div className="space-y-3 mb-4 sm:mb-6">
          {settings.paymentMethods.length > 0 ? (
            settings.paymentMethods.map((method) => {
              const Icon = settings.getPaymentMethodIcon(method.type);
              return (
                <div
                  key={method.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-3 rounded-md shadow-sm gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <Icon size={20} className="text-blue-500 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base truncate">
                      {settings.getPaymentMethodDisplay(method)}
                    </span>
                  </div>
                  <div className="self-end sm:self-auto">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        settings.handleRemovePaymentMethod(method.id)
                      }
                      icon={Trash2}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-sm">
              No payment methods added yet.
            </p>
          )}
        </div>

        <form onSubmit={settings.handleAddPaymentMethod}>
          <SelectField
            label="Payment Method Type"
            value={settings.paymentMethodType}
            onChange={(e) => settings.setPaymentMethodType(e.target.value)}
            options={[
              { value: "Credit Card", label: "Credit Card" },
              { value: "Wallet", label: "Digital Wallet" },
              { value: "Apple Pay", label: "Apple Pay" },
              { value: "Google Pay", label: "Google Pay" },
            ]}
            icon={settings.getPaymentMethodIcon(settings.paymentMethodType)}
          />

          {settings.paymentMethodType === "Credit Card" ? (
            <>
              <InputField
                label="Card Name"
                type="text"
                value={settings.cardName}
                onChange={(e) => settings.setCardName(e.target.value)}
                placeholder="e.g., John Doe"
                icon={User}
                required
              />
              <InputField
                label="Card Number"
                type="text"
                value={settings.cardNumber}
                onChange={(e) => settings.setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                icon={CreditCard}
                required
              />
              <InputField
                label="Expiry Date (MM/YY)"
                type="text"
                value={settings.expiryDate}
                onChange={(e) => settings.setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                icon={Calendar}
                required
              />
              <InputField
                label="CVV"
                type="text"
                value={settings.cvv}
                onChange={(e) => settings.setCvv(e.target.value)}
                placeholder="XXX"
                icon={ShieldCheck}
                required
              />
            </>
          ) : (
            <>
              <InputField
                label="Account Name"
                type="text"
                value={settings.accountName}
                onChange={(e) => settings.setAccountName(e.target.value)}
                placeholder="e.g., John Doe's Wallet"
                icon={User}
                required
              />
              <InputField
                label={
                  settings.paymentMethodType === "Wallet"
                    ? "Wallet ID/Email"
                    : "Account ID/Email"
                }
                type="text"
                value={accountId}
                onChange={(e) => settings.setAccountId(e.target.value)}
                placeholder={
                  settings.paymentMethodType === "Wallet"
                    ? "e.g., wallet@example.com"
                    : "e.g., user@apple.com"
                }
                icon={Mail}
                required
              />
            </>
          )}

          {settings.paymentMessage && (
            <p className="text-green-600 text-sm mb-4">
              {settings.paymentMessage}
            </p>
          )}
          <Button type="submit" className="w-full mt-4" icon={PlusCircle}>
            Add Payment Method
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsTab;
