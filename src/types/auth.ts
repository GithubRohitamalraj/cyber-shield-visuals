
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
  description: string;
}

export interface CompletedScenario {
  id: string;
  scenario_id: number;
  score: number;
  completed_at: string;
  user_id: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: number;
  earned_at: string;
}

// Badge definitions that can be shared across components
export const badgeDefinitions: Badge[] = [
  { id: 1, name: "Phishing Expert", icon: "Mail", description: "Successfully completed all phishing challenges" },
  { id: 2, name: "Scam Buster", icon: "ShieldCheck", description: "Reported 5 or more scams" },
  { id: 3, name: "Digital Defender", icon: "Award", description: "Reached level 5" },
  { id: 4, name: "Financial Guard", icon: "CreditCard", description: "Completed all financial scam challenges" }
];
