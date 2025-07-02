
import React from 'react';
import { Card } from '@/components/ui/card';
import { Division, TeamMember, TARGET_POINTS } from '@/types/gameTypes';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  division: Division;
  teamMembers: TeamMember[];
}

const Dashboard: React.FC<DashboardProps> = ({ division, teamMembers }) => {
  const sortedMembers = [...teamMembers].sort((a, b) => b.salesPoints - a.salesPoints);
  
  const chartData = teamMembers.map((member) => ({
    name: member.name,
    sales: member.salesPoints,
    visits: member.visits,
    calls: member.calls,
    chats: member.chats,
    total_activities: member.visits + member.calls + member.chats
  }));

  const pieData = [
    { name: 'Selesai', value: teamMembers.reduce((sum, m) => sum + m.salesPoints, 0) },
    { name: 'Tersisa', value: (TARGET_POINTS * teamMembers.length) - teamMembers.reduce((sum, m) => sum + m.salesPoints, 0) }
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
          <div className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Sales</p>
                <p className="text-3xl font-bold">
                  {teamMembers.reduce((sum, m) => sum + m.salesPoints, 0)}
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
          <div className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg. Performance</p>
                <p className="text-3xl font-bold">
                  {Math.round((teamMembers.reduce((sum, m) => sum + m.salesPoints, 0) / teamMembers.length / TARGET_POINTS) * 100)}%
                </p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0">
          <div className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Top Performer</p>
                <p className="text-lg font-bold">
                  {sortedMembers[0]?.name || 'N/A'}
                </p>
                <p className="text-sm">{sortedMembers[0]?.salesPoints || 0} poin</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
          <div className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Activities</p>
                <p className="text-3xl font-bold">
                  {teamMembers.reduce((sum, m) => sum + m.visits + m.calls + m.chats, 0)}
                </p>
              </div>
              <div className="text-4xl">📞</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            🏁 Leaderboard {division.name}
          </h3>
          <div className="space-y-4">
            {sortedMembers.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30' :
                  index === 2 ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-600/30' :
                  'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </div>
                  <div className="text-2xl">{member.avatar}</div>
                  <div>
                    <div className="text-white font-semibold">{member.name}</div>
                    <div className="text-sm text-gray-400">
                      V: {member.visits} | T: {member.calls} | C: {member.chats}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-400">{member.salesPoints}</div>
                  <div className="text-sm text-gray-400">
                    {Math.round((member.salesPoints / TARGET_POINTS) * 100)}% target
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Activities Chart */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sales vs Total Activities</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="sales" fill="#F59E0B" name="Sales Points" />
                <Bar dataKey="total_activities" fill="#10B981" name="Total Activities" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Progress Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Lead Measures Detail */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Lead Measures - Activity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="visits" stroke="#8B5CF6" strokeWidth={2} name="Kunjungan" />
              <Line type="monotone" dataKey="calls" stroke="#06B6D4" strokeWidth={2} name="Telepon" />
              <Line type="monotone" dataKey="chats" stroke="#F59E0B" strokeWidth={2} name="Chat" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
