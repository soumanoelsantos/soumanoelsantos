
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

export const formatCurrency = (value: number, currency: string = 'BRL'): string => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const getCurrencySymbol = (currency: string = 'BRL'): string => {
  return currency === 'USD' ? '$' : 'R$';
};

export const calculateCashCollect = (receita: number, faturamento: number): number => {
  if (faturamento <= 0) return 0;
  const result = (receita / faturamento) * 100;
  console.log('🔍 [DEBUG] calculateCashCollect:', {
    receita,
    faturamento,
    result: `${result.toFixed(2)}%`,
    formula: `(${receita} / ${faturamento}) * 100 = ${result.toFixed(2)}%`
  });
  return result;
};
