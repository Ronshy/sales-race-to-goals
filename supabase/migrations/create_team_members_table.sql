-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sales_points INTEGER DEFAULT 0,
    visits INTEGER DEFAULT 0,
    calls INTEGER DEFAULT 0,
    chats INTEGER DEFAULT 0,
    color VARCHAR(7) DEFAULT '#ff6b35',
    avatar VARCHAR(10) DEFAULT '🏎️',
    division_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_division_id ON public.team_members(division_id);
CREATE INDEX IF NOT EXISTS idx_team_members_created_at ON public.team_members(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on team_members" ON public.team_members
    FOR ALL USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON public.team_members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 