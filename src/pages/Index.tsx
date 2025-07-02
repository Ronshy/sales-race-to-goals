
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DivisionSelector from '@/components/DivisionSelector';
import RaceTrack from '@/components/RaceTrack';
import Dashboard from '@/components/Dashboard';
import TeamManager from '@/components/TeamManager';
import { Division, TeamMember } from '@/types/gameTypes';

const Index = () => {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeView, setActiveView] = useState<'race' | 'dashboard' | 'team'>('race');

  const handleDivisionSelect = (division: Division) => {
    setSelectedDivision(division);
    // Initialize with sample team members
    setTeamMembers([
      {
        id: '1',
        name: 'John Doe',
        salesPoints: 350,
        visits: 25,
        calls: 40,
        chats: 30,
        color: '#ff6b35',
        avatar: '🏎️'
      },
      {
        id: '2',
        name: 'Jane Smith',
        salesPoints: 720,
        visits: 35,
        calls: 60,
        chats: 45,
        color: '#00b4d8',
        avatar: '🚗'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        salesPoints: 890,
        visits: 42,
        calls: 75,
        chats: 52,
        color: '#90e0ef',
        avatar: '🏁'
      }
    ]);
  };

  if (!selectedDivision) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
              🏁 4DX Racing Championship
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Gamifikasi Pencapaian Target Penjualan - 1000 Poin untuk Victory!
            </p>
          </div>
          <DivisionSelector onSelectDivision={handleDivisionSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedDivision(null)}
                className="text-white hover:bg-white/10"
              >
                ← Kembali
              </Button>
              <h1 className="text-2xl font-bold text-white">
                🏁 {selectedDivision.name}
              </h1>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeView === 'race' ? 'default' : 'ghost'}
                onClick={() => setActiveView('race')}
                className={activeView === 'race' ? 'bg-orange-500 hover:bg-orange-600' : 'text-white hover:bg-white/10'}
              >
                🏎️ Race Track
              </Button>
              <Button
                variant={activeView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveView('dashboard')}
                className={activeView === 'dashboard' ? 'bg-blue-500 hover:bg-blue-600' : 'text-white hover:bg-white/10'}
              >
                📊 Dashboard
              </Button>
              <Button
                variant={activeView === 'team' ? 'default' : 'ghost'}
                onClick={() => setActiveView('team')}
                className={activeView === 'team' ? 'bg-green-500 hover:bg-green-600' : 'text-white hover:bg-white/10'}
              >
                👥 Tim
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeView === 'race' && (
          <RaceTrack 
            division={selectedDivision} 
            teamMembers={teamMembers}
            onUpdateMember={setTeamMembers}
          />
        )}
        {activeView === 'dashboard' && (
          <Dashboard 
            division={selectedDivision} 
            teamMembers={teamMembers}
          />
        )}
        {activeView === 'team' && (
          <TeamManager 
            division={selectedDivision}
            teamMembers={teamMembers}
            onUpdateTeam={setTeamMembers}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
