
export const getCodeBlockPatterns = () => [
  // 1. Procurar por blocos de código TSX/JSX explícitos
  /```(?:tsx|jsx|typescript|react)\s*([\s\S]*?)```/i,
  // 2. Procurar por blocos de código genéricos
  /```[a-zA-Z]*\s*([\s\S]*?)```/
];

export const getReactComponentPatterns = () => [
  // Componente React funcional completo
  /import\s+React[^;]*;[\s\S]*?export\s+default\s+\w+;/,
  // Componente React com função
  /const\s+\w+\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?\};[\s\S]*?export\s+default\s+\w+;/,
  // Arquivo de página React
  /import\s+React[^;]*;[\s\S]*?const\s+\w+\s*=[\s\S]*?export\s+default\s+\w+;/
];
