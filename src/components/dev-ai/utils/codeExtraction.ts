
export const extractCodeFromResponse = (response: string) => {
  console.log('🔍 Iniciando extração de código da resposta...');
  console.log('📄 Resposta recebida (primeiros 500 chars):', response.substring(0, 500));
  
  // 1. Procurar por blocos de código TSX/JSX explícitos
  const tsxBlockMatch = response.match(/```(?:tsx|jsx|typescript|react)\s*([\s\S]*?)```/i);
  if (tsxBlockMatch && tsxBlockMatch[1].trim()) {
    const code = tsxBlockMatch[1].trim();
    if (isValidReactCode(code)) {
      console.log('✅ Código React TSX válido encontrado');
      console.log('📏 Tamanho do código extraído:', code.length);
      return code;
    }
  }

  // 2. Procurar por blocos de código genéricos que sejam React válidos
  const genericCodeMatch = response.match(/```[a-zA-Z]*\s*([\s\S]*?)```/);
  if (genericCodeMatch && genericCodeMatch[1].trim()) {
    const code = genericCodeMatch[1].trim();
    if (isValidReactCode(code)) {
      console.log('✅ Código React válido encontrado em bloco genérico');
      console.log('📏 Tamanho do código extraído:', code.length);
      return code;
    }
  }

  // 3. Procurar por componentes React válidos no texto
  const reactComponentMatches = [
    // Componente React funcional completo
    /import\s+React[^;]*;[\s\S]*?export\s+default\s+\w+;/,
    // Componente React com função
    /const\s+\w+\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?\};[\s\S]*?export\s+default\s+\w+;/,
    // Arquivo de página React
    /import\s+React[^;]*;[\s\S]*?const\s+\w+\s*=[\s\S]*?export\s+default\s+\w+;/
  ];

  for (const pattern of reactComponentMatches) {
    const match = response.match(pattern);
    if (match) {
      const code = match[0].trim();
      if (isValidReactCode(code)) {
        console.log('✅ Componente React válido encontrado');
        console.log('📏 Tamanho do código extraído:', code.length);
        return code;
      }
    }
  }

  // 4. Se há menção a páginas específicas, criar componente React apropriado
  if (response.toLowerCase().includes('relatórios') || response.toLowerCase().includes('relatorios')) {
    console.log('🔧 Criando página de relatórios React');
    
    const reportsComponent = `import React from 'react';
import { 
  BarChart2,
  PieChart,
  FileText,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const RelatoriosAvancados = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatórios Avançados
          </h1>
          <p className="text-gray-600">
            Gerencie e visualize relatórios detalhados do seu negócio
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Período
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Vendas Mensais</h3>
                <p className="text-sm text-gray-600">Análise de vendas</p>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Distribuição</h3>
                <p className="text-sm text-gray-600">Por categoria</p>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Financeiro</h3>
                <p className="text-sm text-gray-600">Receitas e despesas</p>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Gerar Novo Relatório</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Relatório
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Selecione o tipo</option>
                <option>Vendas</option>
                <option>Financeiro</option>
                <option>Estoque</option>
                <option>Clientes</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Data Inicial
                </label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Data Final
                </label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg" 
                />
              </div>
            </div>
            <Button className="w-full">
              Gerar Relatório
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RelatoriosAvancados;`;
    
    console.log('✅ Componente de relatórios criado');
    return reportsComponent;
  }

  // 5. Fallback para componente genérico válido
  console.log('🔧 Criando componente React genérico válido');
  
  const genericComponent = `import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ComponenteGerado = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Componente Gerado
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Este componente foi criado com base na sua solicitação.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-800">
              Descreva melhor o que você gostaria de criar para gerar código mais específico.
            </p>
          </div>
          <div className="mt-6">
            <Button className="mr-4">
              Ação Principal
            </Button>
            <Button variant="outline">
              Ação Secundária
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponenteGerado;`;
  
  console.log('✅ Componente React genérico criado');
  return genericComponent;
};

// Função para validar se o código é React válido
const isValidReactCode = (code: string): boolean => {
  console.log('🔍 Validando código React...');
  
  // Verificações básicas de sintaxe React
  const hasValidImports = code.includes('import React') || code.includes('import');
  const hasExportDefault = code.includes('export default');
  const hasValidComponent = /const\s+\w+\s*=|function\s+\w+/.test(code);
  
  // Verificar se tem estrutura JSX básica válida
  const hasValidJSX = /<[A-Z][\w]*/.test(code) || /<div|<section|<main|<header/.test(code);
  
  // Verificar se não tem HTML puro (deve ser JSX/React)
  const isPureHTML = code.includes('<!DOCTYPE html>') || 
                     (code.includes('<html') && !code.includes('import'));

  // Verificar se tem return statement com JSX
  const hasReturnJSX = /return\s*\([\s\S]*?</.test(code) || /return\s*</.test(code);

  // Verificar se não tem sintaxe inválida
  const hasInvalidSyntax = code.includes('class="') && code.includes('className=');

  // Versão mais rigorosa - aceitar só se for React válido
  const isValid = (hasValidImports || hasValidComponent) && 
                  (hasExportDefault || hasValidComponent) && 
                  (hasValidJSX || hasReturnJSX) &&
                  !isPureHTML &&
                  !hasInvalidSyntax;

  console.log('📊 Validação de código React:');
  console.log('- Imports válidos:', hasValidImports);
  console.log('- Export default:', hasExportDefault);
  console.log('- Componente válido:', hasValidComponent);
  console.log('- JSX válido:', hasValidJSX);
  console.log('- Return com JSX:', hasReturnJSX);
  console.log('- Não é HTML puro:', !isPureHTML);
  console.log('- Não tem sintaxe inválida:', !hasInvalidSyntax);
  console.log('- Resultado final:', isValid);

  if (!isValid) {
    console.log('❌ Código rejeitado - não atende aos critérios mínimos de React');
    console.log('🔍 Primeiros 500 chars do código rejeitado:', code.substring(0, 500));
  } else {
    console.log('✅ Código React aceito para preview');
  }

  return isValid;
};
