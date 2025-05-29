
export const generatePrompt = (
  userMessage: string, 
  currentProject: any, 
  generatedCode: string, 
  isIncremental: boolean,
  hasImage: boolean,
  imageInput?: string
): string => {
  let prompt = `Você é um assistente de desenvolvimento web especializado em criar aplicações React com TypeScript, usando roteamento adequado e estrutura de páginas separadas.

🚨 REGRAS OBRIGATÓRIAS DE ARQUITETURA:
1. SEMPRE crie páginas React separadas (.tsx) para cada funcionalidade
2. SEMPRE use React Router para navegação entre páginas
3. JAMAIS crie um HTML único com múltiplas seções
4. Cada página deve ser um componente React independente
5. Use a estrutura de pastas: src/pages/ para páginas principais
6. Crie componentes reutilizáveis em: src/components/
7. Use TypeScript em todos os arquivos
8. Implemente navegação com Link do react-router-dom`;
  
  if (currentProject && generatedCode && isIncremental) {
    prompt += `\n\n🚨 MODO INCREMENTAL OBRIGATÓRIO - PRESERVAÇÃO TOTAL DO LAYOUT 🚨

CÓDIGO EXISTENTE DO PROJETO "${currentProject.name}":
\`\`\`tsx
${generatedCode}
\`\`\`

⛔ REGRAS ABSOLUTAS E INVIOLÁVEIS:
1. JAMAIS substitua ou remova o código existente
2. JAMAIS altere o layout, design ou estrutura atual
3. JAMAIS crie um novo documento HTML do zero
4. PRESERVE 100% do header, sidebar, menu e estilos existentes
5. MANTENHA todas as páginas que já existem funcionando
6. ADICIONE APENAS a nova página/funcionalidade solicitada
7. Use EXATAMENTE a mesma estrutura CSS e JavaScript existente
8. Adicione a nova opção no menu de navegação atual
9. Siga RIGOROSAMENTE o mesmo padrão visual e de código
10. MANTENHA toda a funcionalidade JavaScript existente

🎯 INSTRUÇÕES OBRIGATÓRIAS DE IMPLEMENTAÇÃO:
- Analise o código existente para entender a estrutura de navegação
- Identifique onde adicionar a nova página no menu atual
- Crie o conteúdo da nova página seguindo EXATAMENTE o mesmo padrão
- Mantenha TODA a funcionalidade existente intacta
- Retorne APENAS o código COMPLETO com a nova página INTEGRADA ao sistema atual

IMPORTANTE: Se o código tem menu lateral/superior, adicione a nova opção lá. Se tem navegação por abas/botões, adicione uma nova aba. SEMPRE mantenha consistência visual e funcional com o que já existe.`;
  }
  
  if (hasImage) {
    prompt += `\n\nO usuário enviou uma imagem. Analise a imagem e`;
    if (imageInput?.trim()) {
      prompt += ` também disse: "${imageInput.trim()}"`;
    }
    prompt += ` Crie código baseado no que você vê na imagem.`;
  } else {
    prompt += `\n\nSOLICITAÇÃO DO USUÁRIO: "${userMessage}"`;
  }
  
  prompt += `\n\n🏗️ ESTRUTURA OBRIGATÓRIA DE RESPOSTA:
- Crie páginas React separadas em src/pages/
- Configure roteamento no App.tsx
- Crie componentes reutilizáveis se necessário
- Use navegação com Link do react-router-dom
- Mantenha TypeScript em todos os arquivos
- Implemente layout responsivo com Tailwind CSS`;
  
  if (isIncremental && generatedCode) {
    prompt += `\n\n🔥 LEMBRETE CRÍTICO FINAL:
- MODO INCREMENTAL ESTÁ ATIVO E É OBRIGATÓRIO
- NÃO substitua NADA do código existente
- APENAS adicione/integre a nova funcionalidade
- PRESERVE todo o layout, design e funcionalidade atual
- INTEGRE a nova página ao sistema de navegação existente
- O resultado deve ser o código existente + nova página integrada`;
  }
  
  prompt += `\n\nResponda SEMPRE com páginas React separadas e roteamento adequado. Use blocos de código markdown com \`\`\`tsx para envolver seu código.`;

  return prompt;
};
