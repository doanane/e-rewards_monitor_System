import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, faMedal, faAward, faUserTie, 
  faUsers, faCalendarAlt, faFilter 
} from '@fortawesome/free-solid-svg-icons';

const NominationsPage = () => {
  // Sample data - replace with your API data
  const nominationData = [
    { id: 1, nominee: 'Sarah Johnson', department: 'Marketing', 
      nominator: 'Michael Chen', date: '2023-05-15', 
      reason: 'Exceeded Q2 campaign targets by 150%', status: 'Approved', points: 500 },
    { id: 2, nominee: 'David Kim', department: 'Engineering', 
      nominator: 'Lisa Wong', date: '2023-05-18', 
      reason: 'Led critical system migration with zero downtime', status: 'Pending', points: 750 },
    { id: 3, nominee: 'Emma Rodriguez', department: 'Customer Success', 
      nominator: 'James Wilson', date: '2023-05-10', 
      reason: 'Record customer satisfaction scores this quarter', status: 'Approved', points: 400 },
    { id: 4, nominee: 'Thomas Baker', department: 'Sales', 
      nominator: 'Olivia Martin', date: '2023-05-20', 
      reason: 'Closed largest deal in company history', status: 'Rejected', points: 1000 },
    { id: 5, nominee: 'Priya Patel', department: 'Product', 
      nominator: 'Robert Johnson', date: '2023-05-05', 
      reason: 'Innovative feature suggestion implemented', status: 'Approved', points: 300 },
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Customer Success', label: 'Customer Success' },
    { value: 'Product', label: 'Product' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState(departmentOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter nominations based on selections
  const filteredNominations = nominationData.filter(nomination => {
    const matchesDepartment = selectedDepartment.value === 'all' || 
                             nomination.department === selectedDepartment.value;
    const matchesStatus = selectedStatus.value === 'all' || 
                         nomination.status === selectedStatus.value;
    const matchesSearch = nomination.nominee.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         nomination.nominator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nomination.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesStatus && matchesSearch;
  });

  // Data for charts
  const approvalData = [
    { name: 'Approved', value: nominationData.filter(n => n.status === 'Approved').length },
    { name: 'Pending', value: nominationData.filter(n => n.status === 'Pending').length },
    { name: 'Rejected', value: nominationData.filter(n => n.status === 'Rejected').length },
  ];

  const departmentNominationCounts = [
    { name: 'Marketing', nominations: nominationData.filter(n => n.department === 'Marketing').length },
    { name: 'Engineering', nominations: nominationData.filter(n => n.department === 'Engineering').length },
    { name: 'Sales', nominations: nominationData.filter(n => n.department === 'Sales').length },
    { name: 'Customer Success', nominations: nominationData.filter(n => n.department === 'Customer Success').length },
    { name: 'Product', nominations: nominationData.filter(n => n.department === 'Product').length },
  ];

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold mb-6">Employee Recognition Nominations</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Total Nominations</h3>
              <p className="text-2xl font-bold">{nominationData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMedal} className="text-blue-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Approved</h3>
              <p className="text-2xl font-bold">
                {nominationData.filter(n => n.status === 'Approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faAward} className="text-green-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Total Points Awarded</h3>
              <p className="text-2xl font-bold">
                {nominationData.filter(n => n.status === 'Approved')
                 .reduce((sum, n) => sum + n.points, 0)
                 .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUserTie} className="text-purple-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Unique Nominees</h3>
              <p className="text-2xl font-bold">
                {new Set(nominationData.map(n => n.nominee)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="relative w-full h-[400px] overflow-auto border border-gray-200 rounded-lg shadow-sm">
  {/* Content container with large dimensions to enable scrolling */}
  <div className="min-w-[800px] min-h-[600px] p-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* First Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FontAwesomeIcon icon={faUsers} className="mr-2" /> Nominations by Department
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentNominationCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="nominations" fill="#8884d8" name="Nominations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Approval Status
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={approvalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optional: Add more content here to enable more scrolling */}
      <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Additional Data</h2>
        <div className="h-64 w-full">
          {/* You could add another chart or content here */}
        </div>
      </div>
    </div>
  </div>

  {/* Scroll position indicators (optional) */}
  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
    Scroll ← → ↑ ↓
  </div>
</div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filter Nominations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <Select
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              isSearchable={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              isSearchable={false}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              placeholder="Search nominees, nominators, or reasons..."
              className="w-full border p-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Nominations Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Nominations</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + New Nomination
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNominations.length > 0 ? (
                filteredNominations.map((nomination) => (
                  <tr key={nomination.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {nomination.nominee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nomination.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nomination.nominator}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate hover:max-w-none">
                        {nomination.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nomination.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        nomination.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        nomination.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {nomination.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        View
                      </button>
                      {nomination.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-800 mr-3">
                            Approve
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No nominations match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Nomination Modal (would be implemented) */}
      {/* <NewNominationModal /> */}
    </div>
  );
};

export default NominationsPage;