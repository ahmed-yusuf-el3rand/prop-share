 New Component: PaymentSettingsModal (now for Banking Accounts)
const PaymentSettingsModal = ({ isOpen, onClose, currentUser, onAddPaymentMethod, onRemovePaymentMethod }) => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankingMessage, setBankingMessage] = useState('');

  // Reset form fields and messages when modal opens
  useEffect(() => {
    if (isOpen) {
      setAccountName('');
      setAccountNumber('');
      setRoutingNumber('');
      setBankName('');
      setBankingMessage('');
    }
  }, [isOpen]);

  const handleAddBankingAccount = (e) => {
    e.preventDefault();
    setBankingMessage('');
    if (!accountName || !accountNumber || !routingNumber || !bankName) {
      setBankingMessage(<span className="text-red-600 text-sm">Please fill all banking account details.</span>);
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
    setAccountName('');
    setAccountNumber('');
    setRoutingNumber('');
    setBankName('');
    setBankingMessage('Banking account added successfully!');
  };

  const handleRemoveBankingAccount = (id) => {
    onRemovePaymentMethod(id); // Reusing onRemovePaymentMethod
    setBankingMessage('Banking account removed.');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Banking Accounts">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"><CreditCard size={20} /> Your Banking Accounts</h3>
      <div className="space-y-3 mb-6">
        {currentUser?.bankingAccounts && currentUser.bankingAccounts.length > 0 ? (
          currentUser.bankingAccounts.map((account) => (
            <div key={account.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-blue-500" />
                <span>
                  {account.bankName} - {account.accountName} (****{account.accountNumber.slice(-4)})
                </span>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleRemoveBankingAccount(account.id)} icon={Trash2}>
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No banking accounts added yet.</p>
        )}
      </div>

      <h4 className="text-lg font-semibold text-gray-700 mb-3">Add New Banking Account</h4>
      <form onSubmit={handleAddBankingAccount}>
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

        {bankingMessage && <p className="text-green-600 text-sm mb-4">{bankingMessage}</p>}
        <Button type="submit" className="w-full mt-4" icon={PlusCircle}>
          Add Banking Account
        </Button>
      </form>
    </Modal>
  );
};