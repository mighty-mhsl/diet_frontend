export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const getDaysUntilExpiration = (expirationDate: string): number => {
  const expiry = new Date(expirationDate);
  const today = new Date();
  const timeDiff = expiry.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const getExpirationStatus = (expirationDate: string): 'good' | 'expiring' | 'expired' => {
  const days = getDaysUntilExpiration(expirationDate);
  
  if (days < 0) return 'expired';
  if (days <= 3) return 'expiring';
  return 'good';
};