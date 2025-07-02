import { useState, useEffect } from 'react';
import { TeamMember } from '@/types/gameTypes';
import { TeamService } from '@/services/teamService';
import { useToast } from '@/hooks/use-toast';

export const useTeam = (divisionId?: string) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load team members when division changes
  useEffect(() => {
    if (divisionId) {
      loadTeamMembers();
    } else {
      setTeamMembers([]);
    }
  }, [divisionId]);

  const loadTeamMembers = async () => {
    if (!divisionId) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const members = await TeamService.getTeamMembers(divisionId);
      setTeamMembers(members);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data anggota tim';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTeamMember = async (memberData: {
    name: string;
    salesPoints: number;
    visits: number;
    calls: number;
    chats: number;
    color: string;
    avatar: string;
  }) => {
    if (!divisionId) {
      toast({
        title: "Error",
        description: "Divisi belum dipilih",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = {
        name: memberData.name,
        sales_points: memberData.salesPoints,
        visits: memberData.visits,
        calls: memberData.calls,
        chats: memberData.chats,
        color: memberData.color,
        avatar: memberData.avatar,
        division_id: divisionId
      };

      const newMember = await TeamService.addTeamMember(data);
      
      if (newMember) {
        setTeamMembers(prev => [...prev, newMember]);
        toast({
          title: "Sukses",
          description: "Anggota tim berhasil ditambahkan",
        });
        return newMember;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menambahkan anggota tim';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    setIsLoading(true);
    setError(null);

    try {
      const memberData: any = {};
      if (updates.name !== undefined) memberData.name = updates.name;
      if (updates.salesPoints !== undefined) memberData.sales_points = updates.salesPoints;
      if (updates.visits !== undefined) memberData.visits = updates.visits;
      if (updates.calls !== undefined) memberData.calls = updates.calls;
      if (updates.chats !== undefined) memberData.chats = updates.chats;
      if (updates.color !== undefined) memberData.color = updates.color;
      if (updates.avatar !== undefined) memberData.avatar = updates.avatar;

      const updatedMember = await TeamService.updateTeamMember(id, memberData);
      
      if (updatedMember) {
        setTeamMembers(prev => 
          prev.map(member => member.id === id ? updatedMember : member)
        );
        toast({
          title: "Sukses",
          description: "Data anggota berhasil diperbarui",
        });
        return updatedMember;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui data anggota';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await TeamService.deleteTeamMember(id);
      
      if (success) {
        setTeamMembers(prev => prev.filter(member => member.id !== id));
        toast({
          title: "Sukses",
          description: "Anggota tim berhasil dihapus",
        });
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus anggota tim';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemberStats = async (id: string, stats: {
    salesPoints?: number;
    visits?: number;
    calls?: number;
    chats?: number;
  }) => {
    try {
      const updatedMember = await TeamService.updateMemberStats(id, stats);
      
      if (updatedMember) {
        setTeamMembers(prev => 
          prev.map(member => member.id === id ? updatedMember : member)
        );
        return updatedMember;
      }
      return null;
    } catch (err) {
      console.error('Error updating member stats:', err);
      return null;
    }
  };

  return {
    teamMembers,
    isLoading,
    error,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    updateMemberStats,
    refreshTeamMembers: loadTeamMembers
  };
}; 