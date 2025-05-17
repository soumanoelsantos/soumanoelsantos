
import { authenticationService } from './authenticationService';
import { sessionService } from './sessionService';
import { profileService } from './profileService';
import { getAuthErrorMessage } from './errorHandling';

/**
 * Authentication service to handle all Supabase auth API calls
 */
export const authService = {
  // Authentication methods
  signInWithPassword: authenticationService.signInWithPassword,
  signOut: authenticationService.signOut,
  
  // Session methods
  getSession: sessionService.getSession,
  onAuthStateChange: sessionService.onAuthStateChange,
  
  // Profile methods
  fetchUserProfile: profileService.fetchUserProfile,
  updateUserAdminStatus: profileService.updateUserAdminStatus,
};

export {
  getAuthErrorMessage
};
