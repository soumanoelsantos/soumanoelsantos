
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isNewUser: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, redirectPath: string | null) => Promise<void>;
  logout: () => Promise<void>;
  setUserAsAdmin: (value: boolean) => Promise<void>;
  loginRedirectPath: string | null;
  userId: string | null;
}

export interface UserProfile {
  id: string;
  is_new_user: boolean;
  is_admin: boolean;
  email?: string;
}
