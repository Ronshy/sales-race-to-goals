import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from '@/types/gameTypes';

export interface TeamMemberData {
  id?: string;
  name: string;
  sales_points: number;
  visits: number;
  calls: number;
  chats: number;
  color: string;
  avatar: string;
  division_id: string;
  created_at?: string;
  updated_at?: string;
}

export class TeamService {
  static async getTeamMembers(divisionId: string): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('division_id', divisionId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }

      return data?.map(member => ({
        id: member.id,
        name: member.name,
        salesPoints: member.sales_points,
        visits: member.visits,
        calls: member.calls,
        chats: member.chats,
        color: member.color,
        avatar: member.avatar
      })) || [];
    } catch (error) {
      console.error('Error in getTeamMembers:', error);
      return [];
    }
  }

  static async addTeamMember(memberData: Omit<TeamMemberData, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember | null> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert([memberData])
        .select()
        .single();

      if (error) {
        console.error('Error adding team member:', error);
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        salesPoints: data.sales_points,
        visits: data.visits,
        calls: data.calls,
        chats: data.chats,
        color: data.color,
        avatar: data.avatar
      };
    } catch (error) {
      console.error('Error in addTeamMember:', error);
      return null;
    }
  }

  static async updateTeamMember(id: string, memberData: Partial<TeamMemberData>): Promise<TeamMember | null> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update(memberData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating team member:', error);
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        salesPoints: data.sales_points,
        visits: data.visits,
        calls: data.calls,
        chats: data.chats,
        color: data.color,
        avatar: data.avatar
      };
    } catch (error) {
      console.error('Error in updateTeamMember:', error);
      return null;
    }
  }

  static async deleteTeamMember(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting team member:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteTeamMember:', error);
      return false;
    }
  }

  static async updateMemberStats(id: string, stats: {
    salesPoints?: number;
    visits?: number;
    calls?: number;
    chats?: number;
  }): Promise<TeamMember | null> {
    try {
      const updateData: any = {};
      if (stats.salesPoints !== undefined) updateData.sales_points = stats.salesPoints;
      if (stats.visits !== undefined) updateData.visits = stats.visits;
      if (stats.calls !== undefined) updateData.calls = stats.calls;
      if (stats.chats !== undefined) updateData.chats = stats.chats;

      const { data, error } = await supabase
        .from('team_members')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating member stats:', error);
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        salesPoints: data.sales_points,
        visits: data.visits,
        calls: data.calls,
        chats: data.chats,
        color: data.color,
        avatar: data.avatar
      };
    } catch (error) {
      console.error('Error in updateMemberStats:', error);
      return null;
    }
  }
} 