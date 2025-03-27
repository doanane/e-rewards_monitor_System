import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrophy, faStar, faMedal,
  faSearch, faFilter, faPlus, faDownload
} from '@fortawesome/free-solid-svg-icons';

const EmployeesPage = () => {
  // Sample employee data - replace with API calls
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      points: 1850,
      redemptions: 6,
      lastActivity: '2023-05-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'David Kim',
      department: 'Engineering',
      position: 'Senior Developer',
      points: 3200,
      redemptions: 12,
      lastActivity: '2023-05-18',
      status: 'active'
    },
    // Add more employees...
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter options
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'Human Resources' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  // Apply filters
  useEffect(() => {
    const results = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || 
                              employee.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || 
                          employee.status === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
    setFilteredEmployees(results);
  }, [searchTerm, selectedDepartment, selectedStatus, employees]);

  // Data for charts
  const departmentDistribution = employees.reduce((acc, employee) => {
    const existingDept = acc.find(item => item.name === employee.department);
    if (existingDept) {
      existingDept.value += 1;
    } else {
      acc.push({ name: employee.department, value: 1 });
    }
    return acc;
  }, []);

  const pointsDistribution = [
    { name: '0-500', employees: employees.filter(e => e.points <= 500).length },
    { name: '501-1000', employees: employees.filter(e => e.points > 500 && e.points <= 1000).length },
    { name: '1001-2000', employees: employees.filter(e => e.points > 1000 && e.points <= 2000).length },
    { name: '2000+', employees: employees.filter(e => e.points > 2000).length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Rewards Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Total Employees</h3>
              <p className="text-2xl font-bold">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Active Participants</h3>
              <p className="text-2xl font-bold">
                {employees.filter(e => e.points > 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-purple-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Total Points Earned</h3>
              <p className="text-2xl font-bold">
                {employees.reduce((sum, e) => sum + e.points, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMedal} className="text-green-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Avg. Points per Employee</h3>
              <p className="text-2xl font-bold">
                {Math.round(employees.reduce((sum, e) => sum + e.points, 0) / (employees.length || 1))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Department Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Points Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pointsDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="employees" fill="#8884d8" name="Employees" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Search Employees</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or position..."
                className="pl-10 block w-full border p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Department</label>
            <Select
              options={departmentOptions}
              defaultValue={departmentOptions[0]}
              onChange={(option) => setSelectedDepartment(option.value)}
              isSearchable={false}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              options={statusOptions}
              defaultValue={statusOptions[0]}
              onChange={(option) => setSelectedStatus(option.value)}
              isSearchable={false}
            />
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Employee List</h2>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Employee
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redemptions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold">{employee.points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.redemptions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(employee.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No employees match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;