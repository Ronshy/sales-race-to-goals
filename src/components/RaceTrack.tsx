import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Division, TeamMember, TARGET_POINTS, CHECKPOINT_INTERVAL } from '@/types/gameTypes';

interface RaceTrackProps {
  division: Division;
  teamMembers: TeamMember[];
  onUpdateMember: (members: TeamMember[]) => void;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ division, teamMembers, onUpdateMember }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const updateSalesPoints = (memberId: string, increment: number) => {
    const updatedMembers = teamMembers.map(member => {
      if (member.id === memberId) {
        const newPoints = Math.max(0, Math.min(TARGET_POINTS, member.salesPoints + increment));
        const oldCheckpoint = Math.floor(member.salesPoints / CHECKPOINT_INTERVAL);
        const newCheckpoint = Math.floor(newPoints / CHECKPOINT_INTERVAL);
        
        // Show celebration for checkpoint
        if (newCheckpoint > oldCheckpoint && newPoints > 0) {
          setShowCelebration(memberId);
          setTimeout(() => setShowCelebration(null), 2000);
        }
        
        return { ...member, salesPoints: newPoints };
      }
      return member;
    });
    onUpdateMember(updatedMembers);
  };

  const getCarPosition = (points: number) => {
    return (points / TARGET_POINTS) * 100;
  };

  const getCheckpoints = () => {
    const checkpoints = [];
    for (let i = CHECKPOINT_INTERVAL; i <= TARGET_POINTS; i += CHECKPOINT_INTERVAL) {
      checkpoints.push(i);
    }
    return checkpoints;
  };

  // Leaderboard sort
  const leaderboard = [...teamMembers].sort((a, b) => b.salesPoints - a.salesPoints);

  return (
    <div className="space-y-6">
      {/* Leaderboard */}
      <Card className="bg-black/30 border-white/10">
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">🏆 Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-2 py-1 text-left">#</th>
                  <th className="px-2 py-1 text-left">Nama</th>
                  <th className="px-2 py-1 text-left">Poin</th>
                  <th className="px-2 py-1 text-left">Kunjungan</th>
                  <th className="px-2 py-1 text-left">Telepon</th>
                  <th className="px-2 py-1 text-left">Chat</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((member, idx) => (
                  <tr key={member.id} className={idx === 0 ? 'bg-yellow-900/30 font-bold' : ''}>
                    <td className="px-2 py-1">{idx + 1}</td>
                    <td className="px-2 py-1 flex items-center gap-2"><span className="text-xl">{member.avatar}</span> {member.name}</td>
                    <td className="px-2 py-1 text-orange-400">{member.salesPoints}</td>
                    <td className="px-2 py-1">{member.visits}</td>
                    <td className="px-2 py-1">{member.calls}</td>
                    <td className="px-2 py-1">{member.chats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Race Track Header */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
            🏁 Lintasan Balap {division.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {teamMembers.reduce((sum, member) => sum + member.salesPoints, 0)}
              </div>
              <div className="text-sm opacity-80">Total Poin Tim</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {TARGET_POINTS * teamMembers.length}
              </div>
              <div className="text-sm opacity-80">Target Tim</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round((teamMembers.reduce((sum, member) => sum + member.salesPoints, 0) / (TARGET_POINTS * teamMembers.length)) * 100)}%
              </div>
              <div className="text-sm opacity-80">Progress Tim</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Race Track */}
      <Card className="bg-gradient-to-r from-gray-900 to-slate-800 border-white/10 overflow-hidden">
        <div className="p-6">
          <div className="relative">
            {/* Track Background */}
            <div className="relative h-80 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg overflow-hidden mb-6">
              {/* Garis Start */}
              <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-b from-green-400 via-green-500 to-green-600 opacity-90 z-20 flex flex-col items-center justify-center shadow-lg">
                <div className="absolute -top-10 left-0 text-2xl animate-pulse">🚦</div>
                <div className="absolute -top-6 left-0 text-xs text-green-300 font-bold bg-black/50 px-2 py-1 rounded">START</div>
                <div className="absolute bottom-2 left-0 text-xs text-green-300 font-bold bg-black/50 px-2 py-1 rounded">GARIS</div>
              </div>

              {/* Racing stripes */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-1 bg-white opacity-30"
                    style={{
                      top: `${10 + i * 8}%`,
                      left: 0,
                      right: 0,
                      transform: `skewX(-10deg)`,
                    }}
                  />
                ))}
              </div>

              {/* Checkpoints */}
              {getCheckpoints().map((checkpoint) => (
                <div
                  key={checkpoint}
                  className="absolute top-0 bottom-0 w-1 bg-yellow-400 opacity-60"
                  style={{ left: `${(checkpoint / TARGET_POINTS) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 font-bold">
                    {checkpoint}
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                    🏁
                  </div>
                </div>
              ))}

              {/* Garis Finish */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-b from-red-400 via-red-500 to-red-600 opacity-90 z-20 flex flex-col items-center justify-center shadow-lg">
                <div className="absolute -top-10 right-0 text-2xl animate-pulse">🏆</div>
                <div className="absolute -top-6 right-0 text-xs text-red-300 font-bold bg-black/50 px-2 py-1 rounded">FINISH</div>
                <div className="absolute bottom-2 right-0 text-xs text-red-300 font-bold bg-black/50 px-2 py-1 rounded">GARIS</div>
              </div>

              {/* Cars */}
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`absolute transition-all duration-1000 ease-out ${
                    showCelebration === member.id ? 'animate-bounce' : ''
                  }`}
                  style={{
                    left: `${getCarPosition(member.salesPoints)}%`,
                    top: `${15 + index * 20}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="relative">
                    <div
                      className="text-4xl cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => setSelectedMember(member)}
                      style={{ filter: `hue-rotate(${member.color})` }}
                    >
                      {member.avatar}
                    </div>
                    {showCelebration === member.id && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-pulse">
                        ⭐ +{CHECKPOINT_INTERVAL} ⭐
                      </div>
                    )}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold text-center whitespace-nowrap">
                      {member.name}
                    </div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-orange-400 font-bold">
                      {member.salesPoints}p
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Individual Progress Bars */}
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{member.avatar}</span>
                      <span className="text-white font-semibold">{member.name}</span>
                    </div>
                    <div className="text-orange-400 font-bold">
                      {member.salesPoints} / {TARGET_POINTS} poin
                    </div>
                  </div>
                  <Progress 
                    value={(member.salesPoints / TARGET_POINTS) * 100} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Kunjungan: {member.visits}</span>
                    <span>Telepon: {member.calls}</span>
                    <span>Chat: {member.chats}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      {selectedMember && (
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Update Poin - {selectedMember.name} {selectedMember.avatar}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 5, 10, 25, 50, 100].map((points) => (
                <Button
                  key={points}
                  onClick={() => updateSalesPoints(selectedMember.id, points)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  +{points} Poin
                </Button>
              ))}
              {[1, 5, 10].map((points) => (
                <Button
                  key={`minus-${points}`}
                  onClick={() => updateSalesPoints(selectedMember.id, -points)}
                  variant="destructive"
                >
                  -{points} Poin
                </Button>
              ))}
              <Button
                onClick={() => setSelectedMember(null)}
                variant="outline"
                className="ml-4"
              >
                Tutup
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RaceTrack;
