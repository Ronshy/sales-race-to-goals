
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Division, TeamMember } from '@/types/gameTypes';

interface TeamManagerProps {
  division: Division;
  teamMembers: TeamMember[];
  onUpdateTeam: (members: TeamMember[]) => void;
}

const TeamManager: React.FC<TeamManagerProps> = ({ division, teamMembers, onUpdateTeam }) => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    salesPoints: 0,
    visits: 0,
    calls: 0,
    chats: 0,
    color: '#ff6b35',
    avatar: '🏎️'
  });

  const carAvatars = ['🏎️', '🚗', '🚙', '🚕', '🚐', '🚛', '🏁', '🚓', '🚒', '🚜'];
  const carColors = ['#ff6b35', '#00b4d8', '#90e0ef', '#f72585', '#4cc9f0', '#7209b7', '#f77f00', '#fcbf49', '#d62828', '#003566'];

  const handleAddMember = () => {
    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember
    };
    onUpdateTeam([...teamMembers, member]);
    setNewMember({
      name: '',
      salesPoints: 0,
      visits: 0,
      calls: 0,
      chats: 0,
      color: '#ff6b35',
      avatar: '🏎️'
    });
  };

  const handleUpdateMember = (updatedMember: TeamMember) => {
    const updatedMembers = teamMembers.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    );
    onUpdateTeam(updatedMembers);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== memberId);
    onUpdateTeam(updatedMembers);
  };

  const updateMemberField = (member: TeamMember, field: keyof TeamMember, value: any) => {
    const updatedMember = { ...member, [field]: value };
    const updatedMembers = teamMembers.map(m => m.id === member.id ? updatedMember : m);
    onUpdateTeam(updatedMembers);
  };

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                👥 Manajemen Tim {division.name}
              </h2>
              <p className="text-gray-300">
                Total Anggota: {teamMembers.length} | Kelola data dan performa tim Anda
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  + Tambah Anggota
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Tambah Anggota Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Nama</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Masukkan nama anggota"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sales" className="text-white">Sales Points</Label>
                      <Input
                        id="sales"
                        type="number"
                        value={newMember.salesPoints}
                        onChange={(e) => setNewMember({ ...newMember, salesPoints: parseInt(e.target.value) || 0 })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="visits" className="text-white">Kunjungan</Label>
                      <Input
                        id="visits"
                        type="number"
                        value={newMember.visits}
                        onChange={(e) => setNewMember({ ...newMember, visits: parseInt(e.target.value) || 0 })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="calls" className="text-white">Telepon</Label>
                      <Input
                        id="calls"
                        type="number"
                        value={newMember.calls}
                        onChange={(e) => setNewMember({ ...newMember, calls: parseInt(e.target.value) || 0 })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="chats" className="text-white">Chat</Label>
                      <Input
                        id="chats"
                        type="number"
                        value={newMember.chats}
                        onChange={(e) => setNewMember({ ...newMember, chats: parseInt(e.target.value) || 0 })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Avatar Mobil</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {carAvatars.map((avatar) => (
                        <button
                          key={avatar}
                          onClick={() => setNewMember({ ...newMember, avatar })}
                          className={`text-2xl p-2 rounded border-2 transition-all ${
                            newMember.avatar === avatar ? 'border-blue-400 bg-blue-400/20' : 'border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Warna Mobil</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {carColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setNewMember({ ...newMember, color })}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            newMember.color === color ? 'border-white scale-110' : 'border-gray-600'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleAddMember} className="w-full bg-green-600 hover:bg-green-700">
                    Tambah Anggota
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Team Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-black/20 backdrop-blur-sm border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{member.avatar}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <div className="text-sm text-gray-400">
                      ID: {member.id}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => setEditingMember(member)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>

              {/* Quick Edit Fields */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white text-xs">Sales Points</Label>
                    <Input
                      type="number"
                      value={member.salesPoints}
                      onChange={(e) => updateMemberField(member, 'salesPoints', parseInt(e.target.value) || 0)}
                      className="bg-gray-800 border-gray-600 text-white text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-xs">Kunjungan</Label>
                    <Input
                      type="number"
                      value={member.visits}
                      onChange={(e) => updateMemberField(member, 'visits', parseInt(e.target.value) || 0)}
                      className="bg-gray-800 border-gray-600 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white text-xs">Telepon</Label>
                    <Input
                      type="number"
                      value={member.calls}
                      onChange={(e) => updateMemberField(member, 'calls', parseInt(e.target.value) || 0)}
                      className="bg-gray-800 border-gray-600 text-white text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-xs">Chat</Label>
                    <Input
                      type="number"
                      value={member.chats}
                      onChange={(e) => updateMemberField(member, 'chats', parseInt(e.target.value) || 0)}
                      className="bg-gray-800 border-gray-600 text-white text-sm"
                    />
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="bg-white/5 rounded-lg p-3 mt-4">
                  <div className="text-sm text-gray-300 mb-2">Performance Summary</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-orange-400">Target Progress:</span>
                      <span className="text-white font-bold">
                        {Math.round((member.salesPoints / 1000) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-400">Total Activities:</span>
                      <span className="text-white font-bold">
                        {member.visits + member.calls + member.chats}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Member Dialog */}
      {editingMember && (
        <Dialog open={true} onOpenChange={() => setEditingMember(null)}>
          <DialogContent className="bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit {editingMember.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Nama</Label>
                <Input
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Sales Points</Label>
                  <Input
                    type="number"
                    value={editingMember.salesPoints}
                    onChange={(e) => setEditingMember({ ...editingMember, salesPoints: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Kunjungan</Label>
                  <Input
                    type="number"
                    value={editingMember.visits}
                    onChange={(e) => setEditingMember({ ...editingMember, visits: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Telepon</Label>
                  <Input
                    type="number"
                    value={editingMember.calls}
                    onChange={(e) => setEditingMember({ ...editingMember, calls: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Chat</Label>
                  <Input
                    type="number"
                    value={editingMember.chats}
                    onChange={(e) => setEditingMember({ ...editingMember, chats: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => handleUpdateMember(editingMember)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Simpan
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setEditingMember(null)}
                >
                  Batal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TeamManager;
