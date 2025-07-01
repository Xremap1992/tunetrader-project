/**
 * Utility for generating and managing anonymous user IDs
 */

// Generate a random user ID with specified prefix and length
export const generateUserId = (prefix: string = 'USER', length: number = 6): string => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `${prefix}${result}`;
};

// Generate a tuner ID (different prefix for easy identification)
export const generateTunerId = (): string => {
  return generateUserId('TUNER', 6);
};

// Generate a customer ID
export const generateCustomerId = (): string => {
  return generateUserId('USER', 6);
};

// Validate if a string matches the user ID format
export const isValidUserId = (id: string): boolean => {
  // Check if it starts with USER or TUNER followed by 6 alphanumeric characters
  const regex = /^(USER|TUNER)[0-9A-Z]{6}$/;
  return regex.test(id);
};

// Mask email for display (privacy protection)
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};

// Store user ID in local storage
export const storeUserId = (id: string): void => {
  localStorage.setItem('userId', id);
};

// Retrieve user ID from local storage
export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};

// Clear user ID from local storage (logout)
export const clearUserId = (): void => {
  localStorage.removeItem('userId');
};
