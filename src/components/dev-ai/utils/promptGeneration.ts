
export const generatePrompt = (
  userMessage: string, 
  currentProject: any, 
  generatedCode: string, 
  isIncremental: boolean,
  hasImage: boolean,
  imageInput?: string
): string => {
  let prompt = `Você é um assistente de desenvolvimento web especializado em criar código HTML, CSS e JavaScript.`;
  
  if (currentProject && generatedCode && isIncremental) {
    prompt += `\n\n🔥 INSTRUÇÃO CRÍTICA - MODO INCREMENTAL ATIVADO:

CÓDIGO EXISTENTE DO PROJETO "${currentProject.name}":
\`\`\`html
${generatedCode}
\`\`\`

⚠️ ATENÇÃO: O usuário quer ADICIONAR uma nova página/funcionalidade ao site existente acima.
NÃO crie um novo site. NÃO substitua o código existente.

REGRAS OBRIGATÓRIAS:
1. MANTENHA 100% do layout atual (header, sidebar, menu, estilos)
2. PRESERVE todas as páginas que já existem
3. ADICIONE APENAS a nova página solicitada
4. Use a MESMA estrutura CSS e JavaScript
5. Adicione a nova página ao menu de navegação existente
6. Siga EXATAMENTE o mesmo padrão visual e de código`;
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
  
  if (isIncremental && generatedCode) {
    prompt += `\n\n🎯 COMO PROCEDER:
1. Analise o código existente para entender a estrutura
2. Identifique onde adicionar a nova página no menu
3. Crie o conteúdo da nova página seguindo o mesmo padrão
4. Mantenha TODA a funcionalidade existente
5. Retorne o código COMPLETO com a nova página integrada

IMPORTANTE: Se o código existente tem menu lateral, adicione a nova opção lá. Se tem navegação por abas, adicione uma nova aba. Sempre mantenha a consistência visual e funcional.`;
  }
  
  prompt += `\n\nResponda com código HTML completo e funcional. Use blocos de código markdown com \`\`\`html para envolver seu código.`;

  return prompt;
};
