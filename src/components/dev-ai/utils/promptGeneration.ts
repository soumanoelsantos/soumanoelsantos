
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
    prompt += `\n\nCONTEXTO DO PROJETO: "${currentProject.name}"
    
CÓDIGO EXISTENTE NO PROJETO:
\`\`\`html
${generatedCode}
\`\`\`

INSTRUÇÃO MUITO IMPORTANTE: O usuário quer ADICIONAR uma nova página/funcionalidade ao site existente, NÃO substituir o código atual. 
- MANTENHA todo o layout, menu lateral, header e estrutura existente
- APENAS adicione a nova página solicitada seguindo o mesmo design
- Preserve todas as páginas que já existem
- Use a mesma estrutura de navegação e estilos`;
  }
  
  if (hasImage) {
    prompt += ` O usuário enviou uma imagem. Analise a imagem e`;
    if (imageInput?.trim()) {
      prompt += ` também disse: "${imageInput.trim()}"`;
    }
    prompt += ` Crie código baseado no que você vê na imagem.`;
  } else {
    prompt += ` O usuário disse: "${userMessage}"`;
  }
  
  if (isIncremental && generatedCode) {
    prompt += `\n\nPor favor, ADICIONE a nova funcionalidade ao código existente mantendo TUDO que já estava funcionando. Se for uma nova página, adicione ela ao menu de navegação existente e crie o conteúdo seguindo o mesmo padrão visual.`;
  }
  
  prompt += `
  
Responda de forma útil e gere código completo e funcional. Se for criar uma página web, inclua HTML completo com DOCTYPE, head e body.
Certifique-se de que o código seja responsivo e bem estruturado.

Use blocos de código markdown com três crases seguidas de html para envolver seu código.`;

  return prompt;
};
