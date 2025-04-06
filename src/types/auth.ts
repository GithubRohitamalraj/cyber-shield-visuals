
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  xp: number | null;
  level: number | null;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
}

export interface CompletedScenario {
  id: string;
  scenario_id: number;
  score: number;
  completed_at: string;
}
