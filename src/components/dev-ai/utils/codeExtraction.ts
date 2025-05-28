
export const extractCodeFromResponse = (response: string) => {
  console.log('Extraindo código da resposta:', response);
  
  // Procurar por blocos de código HTML
  const htmlMatch = response.match(/```html\s*([\s\S]*?)```/i);
  if (htmlMatch) {
    console.log('Código HTML encontrado:', htmlMatch[1]);
    return htmlMatch[1].trim();
  }

  // Procurar por blocos de código genéricos que contenham HTML
  const codeMatch = response.match(/```[^\n]*\s*([\s\S]*?)```/);
  if (codeMatch && codeMatch[1].includes('<')) {
    console.log('Código genérico com HTML encontrado:', codeMatch[1]);
    return codeMatch[1].trim();
  }

  // Se não encontrar blocos de código, procurar por HTML no texto
  const htmlInText = response.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);
  if (htmlInText) {
    console.log('HTML encontrado no texto:', htmlInText[0]);
    return htmlInText[0];
  }

  // Procurar por qualquer tag HTML
  const anyHtmlMatch = response.match(/<[^>]+>[\s\S]*<\/[^>]+>/);
  if (anyHtmlMatch) {
    console.log('Tags HTML encontradas:', anyHtmlMatch[0]);
    return anyHtmlMatch[0];
  }

  console.log('Nenhum código encontrado, retornando resposta completa');
  return response;
};
