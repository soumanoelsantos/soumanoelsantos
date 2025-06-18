
export const calculateRemainingDaysInMonth = (): number => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const remainingDays = lastDayOfMonth.getDate() - today.getDate() + 1;
  return Math.max(remainingDays, 1); // Garantir que nunca seja 0
};

export const calculateDailyTarget = (
  monthlyGoal: number,
  currentValue: number,
  remainingDays: number
): number => {
  const remainingAmount = Math.max(monthlyGoal - currentValue, 0);
  return remainingAmount / remainingDays;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
