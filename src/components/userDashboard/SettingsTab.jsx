import { useState } from "react";
import { useEffect } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import {
  User,
  Briefcase,
  Percent,
  Lock,
  Mail,
  CreditCard,
  QrCode,
  Wallet,
  Edit,PlusCircle,
  Trash2
} from "lucide-react";

const SettingsTab = ({
  onUpdateUser,
  onAddPaymentMethod,
  onRemovePaymentMethod,
}) => {
  let currentUser={
    fullName:'ali',
  }
  const [fullName, setFullName] = useState(currentUser.fullName || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [companyName, setCompanyName] = useState(currentUser.companyName || "");
  const [userType, setUserType] = useState(currentUser.userType || "Client");
  const [taxesNumber, setTaxesNumber] = useState(currentUser.taxesNumber || ""); // New state for taxes number
  const [personalInfoMessage, setPersonalInfoMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [accountName, setAccountName] = useState(""); // For banking account
  const [accountNumber, setAccountNumber] = useState(""); // For banking account
  const [routingNumber, setRoutingNumber] = useState(""); // For banking account
  const [bankName, setBankName] = useState(""); // For banking account
  const [bankingAccounts, setBankingAccounts] = useState(
    currentUser.bankingAccounts || []
  ); // Changed from paymentMethods
  const [bankingMessage, setBankingMessage] = useState(""); // Changed from paymentMessage

  useEffect(() => {
    setFullName(currentUser.fullName || "");
    setEmail(currentUser.email || "");
    setUserType(currentUser.userType || "Client");
    setCompanyName(currentUser.companyName || "");
    setTaxesNumber(currentUser.taxesNumber || ""); // Initialize taxes number
    setBankingAccounts(currentUser.bankingAccounts || []); // Initialize banking accounts
  }, [currentUser]);

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    setPersonalInfoMessage("");
    const updatedInfo = {
      ...currentUser,
      fullName: fullName.trim(),
      email: email.trim(),
      userType: userType,
      companyName: userType === "Developer" ? companyName.trim() : undefined,
      taxesNumber: userType === "Developer" ? taxesNumber.trim() : undefined, // Save taxes number for developers
    };
    onUpdateUser(updatedInfo);
    setPersonalInfoMessage("Information updated successfully!");
    setTimeout(() => setPersonalInfoMessage(""), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMessage("");
    if (
      oldPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmNewPassword.trim() === ""
    ) {
      setPasswordMessage(
        <span className="text-red-600 text-sm">
          Please fill all password fields.
        </span>
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage(
        <span className="text-red-600 text-sm">
          New passwords do not match.
        </span>
      );
      return;
    }
    // Dummy password change logic
    if (oldPassword === currentUser.password) {
      // In a real app, hash and compare passwords securely
      onUpdateUser({ ...currentUser, password: newPassword });
      setPasswordMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setPasswordMessage(
        <span className="text-red-600 text-sm">Old password is incorrect.</span>
      );
    }
    setTimeout(() => setPasswordMessage(""), 3000);
  };

  const handleAddBankingAccount = (e) => {
    e.preventDefault();
    setBankingMessage("");
    if (!accountName || !accountNumber || !routingNumber || !bankName) {
      setBankingMessage(
        <span className="text-red-600 text-sm">
          Please fill all banking account details.
        </span>
      );
      return;
    }
    const newAccount = {
      id: Date.now(),
      accountName: accountName.trim(),
      accountNumber: accountNumber.trim(),
      routingNumber: routingNumber.trim(),
      bankName: bankName.trim(),
    };
    onAddPaymentMethod(newAccount); // Reusing onAddPaymentMethod for banking accounts
    setAccountName("");
    setAccountNumber("");
    setRoutingNumber("");
    setBankName("");
    setBankingMessage("Banking account added successfully!");
    setTimeout(() => setBankingMessage(""), 3000);
  };

  const handleRemoveBankingAccount = (id) => {
    onRemovePaymentMethod(id); // Reusing onRemovePaymentMethod
    setBankingMessage("Banking account removed.");
    setTimeout(() => setBankingMessage(""), 3000);
  };

  return (
  <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Account Settings
    </h2>

    {/* Developer Information Section */}
    <section className="mb-10 border-b pb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Briefcase size={20} /> Developer Information
      </h3>
      <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
        <SelectField
          label="Account Type"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          options={[
            { value: "Client", label: "Client" },
            { value: "Developer", label: "Developer" },
          ]}
          icon={User}
          disabled
          className="bg-gray-50 cursor-not-allowed"
        />
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
        {userType === "Developer" && (
          <>
            <InputField
              label="Company Name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your Company Name"
              icon={Briefcase}
              required
            />
            <InputField
              label="Taxes Number"
              type="text"
              value={taxesNumber}
              onChange={(e) => setTaxesNumber(e.target.value)}
              placeholder="e.g., 12-3456789"
              icon={Percent}
            />
          </>
        )}
        {personalInfoMessage && (
          <p className="text-green-600 text-sm">{personalInfoMessage}</p>
        )}
        <Button type="submit" className="w-full" icon={Edit}>
          Update Info
        </Button>
      </form>
    </section>

    {/* Change Password Section */}
    <section className="mb-10 border-b pb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Lock size={20} /> Change Password
      </h3>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <InputField
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Enter old password"
          icon={Lock}
          required
        />
        <InputField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          icon={Lock}
          required
        />
        <InputField
          label="Confirm New Password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="********"
          icon={Lock}
          required
        />
        {passwordMessage && (
          <p className="text-green-600 text-sm">{passwordMessage}</p>
        )}
        <Button type="submit" className="w-full" icon={Edit}>
          Change Password
        </Button>
      </form>
    </section>

    {/* Banking Account Info Section */}
    <section>
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <CreditCard size={20} /> Banking Account Info
      </h3>

      <div className="space-y-3 mb-6">
        {bankingAccounts.length > 0 ? (
          bankingAccounts.map((account) => (
            <div
              key={account.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <CreditCard size={20} className="text-blue-500" />
                <span className="text-sm text-gray-700">
                  {account.bankName} - {account.accountName} (****{account.accountNumber.slice(-4)})
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveBankingAccount(account.id)}
                icon={Trash2}
              >
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">
            No banking accounts added yet.
          </p>
        )}
      </div>

      <h4 className="text-lg font-semibold text-gray-700 mb-3">
        Add New Banking Account
      </h4>
      <form onSubmit={handleAddBankingAccount} className="space-y-4">
        <InputField
          label="Account Name"
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="e.g., My Checking"
          icon={User}
          required
        />
        <InputField
          label="Account Number"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="e.g., 1234567890"
          icon={CreditCard}
          required
        />
        <InputField
          label="Routing Number"
          type="text"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
          placeholder="e.g., 012345678"
          icon={QrCode}
          required
        />
        <InputField
          label="Bank Name"
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="e.g., Bank of America"
          icon={Wallet}
          required
        />
        {bankingMessage && (
          <p className="text-green-600 text-sm">{bankingMessage}</p>
        )}
        <Button type="submit" className="w-full mt-4" icon={PlusCircle}>
          Add Banking Account
        </Button>
      </form>
    </section>
  </div>
);
};

export default SettingsTab;
