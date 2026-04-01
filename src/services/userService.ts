import type { User } from '../_mock';
import { MOCK_USER } from '../_mock';

const SIMULATED_LATENCY_MS = 600;

const simulateRandomError = (): boolean => {
  return Math.random() < 0.05;
};

const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


export const fetchCurrentUser = async (): Promise<User> => {
  await simulateNetworkDelay();

  if (simulateRandomError()) {
    throw new Error('Failed to fetch user profile. Please try again later.');
  }

  return MOCK_USER;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  await simulateNetworkDelay();

  if (simulateRandomError()) {
    throw new Error('Failed to update user profile. Please try again later.');
  }

  return { ...MOCK_USER, ...updates };
};

export const fetchUserPreferences = async (): Promise<{
  theme: 'light' | 'dark';
  notifications: boolean;
  emailUpdates: boolean;
}> => {
  await simulateNetworkDelay(400);

  if (simulateRandomError()) {
    throw new Error('Failed to fetch user preferences. Please try again later.');
  }

  return {
    theme: 'light',
    notifications: true,
    emailUpdates: true,
  };
};

export const updateUserPreferences = async (
  userId: string,
  preferences: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    emailUpdates?: boolean;
  }
): Promise<boolean> => {
  await simulateNetworkDelay(500);

  if (simulateRandomError()) {
    throw new Error('Failed to update preferences. Please try again later.');
  }


  return true;
};
 export const logout = async (): Promise<boolean> => {
  await simulateNetworkDelay(300);

  return true;
};

export const verifySession = async (): Promise<boolean> => {
  await simulateNetworkDelay(200);

  if (simulateRandomError()) {
    return false;
  }

  return true;
};