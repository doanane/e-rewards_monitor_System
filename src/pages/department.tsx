import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Select, { SingleValue } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTrophy, faChartLine, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

interface Department {
  name: string;
  points: number;
  redemptions: number;
  participation: number;
  topReward: string;
}

interface OptionType {
  value: string;
  label: string;
}

const DepartmentsPage = () => {
  // Sample data - replace with your API data
  const departmentData: Department[] = [
    { name: 'Sales', points: 18500, redemptions: 68, participation: 92, topReward: 'Amazon Gift Card' },
    { name: 'Engineering', points: 14200, redemptions: 54, participation: 88, topReward: 'Tech Conferences' },
    { name: 'Marketing', points: 12600, redemptions: 47, participation: 85, topReward: 'Creative Subscriptions' },
    { name: 'HR', points: 9800, redemptions: 32, participation: 78, topReward: 'Wellness Programs' },
    { name: 'Finance', points: 8700, redemptions: 29, participation: 75, topReward: 'Financial Tools' },
    { name: 'Operations', points: 11500, redemptions: 42, participation: 82, topReward: 'Productivity Tools' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Filter options
  const metricOptions: OptionType[] = [
    { value: 'points', label: 'Reward Points' },
    { value: 'redemptions', label: 'Redemptions' },
    { value: 'participation', label: 'Participation Rate' },
  ];

  const timeOptions: OptionType[] = [
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' },
  ];

  const [selectedMetric, setSelectedMetric] = useState<{ value: string; label: string } | null>(metricOptions[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<OptionType>(timeOptions[0]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleMetricChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setSelectedMetric(newValue);
    }
  };

  const handleTimeframeChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setSelectedTimeframe(newValue);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Departmental Rewards Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Total Participating</h3>
              <p className="text-2xl font-bold">6 Departments</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-green-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Leading Department</h3>
              <p className="text-2xl font-bold">Sales</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="text-purple-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Avg. Participation</h3>
              <p className="text-2xl font-bold">83.3%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faExchangeAlt} className="text-yellow-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500">Total Redemptions</h3>
              <p className="text-2xl font-bold">272</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Metric</label>
            <Select<OptionType>
              options={metricOptions}
              value={selectedMetric}
              onChange={handleMetricChange}
              isSearchable={false}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Timeframe</label>
            <Select<OptionType>
              options={timeOptions}
              value={selectedTimeframe}
              onChange={handleTimeframeChange}
              isSearchable={false}
            />
          </div>
          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded h-[38px]">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Department Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Department Comparison</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey={selectedMetric.value} 
                  fill="#8884d8" 
                  name={selectedMetric.label}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Points Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="points"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  onClick={(data) => setSelectedDepartment(data.name)}
                >
                  {departmentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke={selectedDepartment === entry.name ? '#000' : '#fff'}
                      strokeWidth={selectedDepartment === entry.name ? 2 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    value.toLocaleString(), 
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Details */}
      {selectedDepartment && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedDepartment} Department Details
            <button 
              onClick={() => setSelectedDepartment(null)}
              className="float-right text-sm text-blue-600 hover:underline"
            >
              View All Departments
            </button>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-gray-500">Total Points Earned</h3>
              <p className="text-2xl font-bold">
                {departmentData.find(d => d.name === selectedDepartment)?.points.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-gray-500">Redemptions</h3>
              <p className="text-2xl font-bold">
                {departmentData.find(d => d.name === selectedDepartment)?.redemptions}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-gray-500">Participation Rate</h3>
              <p className="text-2xl font-bold">
                {departmentData.find(d => d.name === selectedDepartment)?.participation}%
              </p>
            </div>
          </div>

          <h3 className="font-medium mb-2">Top Rewards in {selectedDepartment}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popularity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time to Redeem</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {departmentData.find(d => d.name === selectedDepartment)?.topReward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">5,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">14 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Department Leaderboard */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Department Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redemptions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentData
                .sort((a, b) => b.points - a.points)
                .map((dept, index) => (
                  <tr 
                    key={dept.name} 
                    className={selectedDepartment === dept.name ? 'bg-blue-50' : ''}
                    onClick={() => setSelectedDepartment(dept.name)}
                    style={{cursor: 'pointer'}}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index === 0 ? (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">1st</span>
                      ) : index === 1 ? (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">2nd</span>
                      ) : index === 2 ? (
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">3rd</span>
                      ) : (
                        <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-full text-xs font-medium">{index + 1}th</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{dept.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{dept.points.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{dept.redemptions}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{dept.participation}%</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{width: `${dept.participation}%`}}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;