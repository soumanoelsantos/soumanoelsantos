
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const getCurrentDay = () => {
  return new Date().getDate();
};

export const calculateProjection = (data: any[], valueKey: string, currentDay: number) => {
  if (!data || data.length === 0 || currentDay <= 0) return data;
  
  // Pegar apenas os dados até o dia atual
  const actualData = data.slice(0, currentDay);
  if (actualData.length < 2) return data;
  
  // Calcular tendência baseada nos últimos dados
  const lastValue = actualData[actualData.length - 1][valueKey];
  const previousValue = actualData[actualData.length - 2][valueKey];
  const trend = lastValue - previousValue;
  
  // Aplicar projeção para os dias restantes
  return data.map((item, index) => {
    if (index < currentDay) {
      return item;
    } else {
      const daysAhead = index - currentDay + 1;
      const projectedValue = lastValue + (trend * daysAhead);
      return {
        ...item,
        [`${valueKey}Projection`]: Math.max(0, projectedValue)
      };
    }
  });
};

export const formatYAxisValue = (value: number, type: 'revenue' | 'billing') => {
  if (type === 'billing' && value >= 1000000) {
    return `${value / 1000000}M`;
  }
  if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return value.toString();
};
