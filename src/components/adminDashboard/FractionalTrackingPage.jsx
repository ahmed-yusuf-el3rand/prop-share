
import projects from '../../adminProjects';

  const FractionTrackingPage = ({onRemoveProperty, onEditProperty }) => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Fraction Tracking</h1>
        <div className="space-y-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{project.name}</h2>
                <p className="text-gray-600 mb-4">Total Price: <span className="font-bold">{formatCurrency(project.price)}</span></p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    <BarChart2 size={18} className="inline-block mr-2" />
                    Live View: {project.ownershipProgress}% Claimed
                  </h3>
                  <ProgressBar progress={project.ownershipProgress} />
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2"><Users size={18} /> Buyer List</h3>
                {project.buyers && project.buyers.length > 0 ? (
                  <ul className="space-y-2">
                    {project.buyers.map((buyer, index) => (
                      <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                        <span className="font-medium text-gray-700">{buyer.name}</span>
                        <span className="text-blue-600 font-semibold">{buyer.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm">No buyers for this project yet.</p>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="secondary" icon={Edit} onClick={() => onEditProperty(project.id)}>
                    Edit Info
                  </Button>
                  <Button variant="danger" icon={Trash2} onClick={() => onRemoveProperty(project.id)}>
                    Remove Property
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg text-center">No projects to track.</p>
          )}
        </div>
      </div>
    );
  };

  export default FractionTrackingPage;