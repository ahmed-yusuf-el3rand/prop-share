import Button from '../common/Button';
// import ProgressBar from 
const FinancialOverviewPage = ({ projects, withdrawableBalance, currentUser, onShowPaymentSettings }) => {
    const totalClaimedAcrossProjects = projects.reduce((sum, project) => sum + (project.price * project.ownershipProgress / 100), 0);
    const hasBankingAccount = currentUser?.bankingAccounts && currentUser.bankingAccounts.length > 0;
    const [withdrawMessage, setWithdrawMessage] = useState('');
    const [withdrawButtonVariant, setWithdrawButtonVariant] = useState('secondary');

    const handleWithdrawFunds = () => {
      if (hasBankingAccount) {
        setWithdrawMessage(<span className="text-green-600 text-sm">Funds successfully withdrawn to your banking account!</span>);
        setWithdrawButtonVariant('success');
      } else {
        setWithdrawMessage(<span className="text-red-600 text-sm">Please add a banking account in settings to withdraw funds.</span>);
        onShowPaymentSettings(); // Open the banking account modal
      }
      setTimeout(() => {
        setWithdrawMessage('');
        setWithdrawButtonVariant('secondary');
      }, 3000);
    };

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <DollarSign size={48} className="mb-3" />
            <p className="text-sm font-light">Total Amount Claimed Across Projects</p>
            <p className="text-4xl font-bold">{formatCurrency(totalClaimedAcrossProjects)}</p>
          </div>
          <div className="bg-green-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <Wallet size={48} className="mb-3" />
            <p className="text-sm font-light">Withdrawable Balance</p>
            <p className="text-4xl font-bold">{formatCurrency(withdrawableBalance)}</p>
            <Button
              variant={withdrawButtonVariant}
              className="mt-4 bg-white text-green-700 hover:bg-gray-100"
              icon={ChevronDown}
              onClick={handleWithdrawFunds}
            >
              Withdraw Funds
            </Button>
            {withdrawMessage && <p className="mt-2 text-center">{withdrawMessage}</p>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><TrendingUpIcon size={20} /> Amount Claimed Per Property</h2>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Total Price: {formatCurrency(project.price)}</p>
                  <ProgressBar
                    progress={project.ownershipProgress}
                    label={`${project.ownershipProgress}% Claimed (${formatCurrency(project.price * project.ownershipProgress / 100)})`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg text-center">No projects to display financial data for.</p>
          )}
        </div>
      </div>
    );
  };

  export default FinancialOverviewPage