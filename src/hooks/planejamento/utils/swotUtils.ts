
import { RespostaPlanejamento } from '@/types/planejamentoEstrategico';

export const gerarSwotAPartirRespostas = (respostas: RespostaPlanejamento[]) => {
  const forcas: string[] = [];
  const fraquezas: string[] = [];
  const oportunidades: string[] = [];
  const ameacas: string[] = [];

  respostas.forEach(resposta => {
    if (resposta.swotClassificacao) {
      const texto = typeof resposta.resposta === 'string' ? resposta.resposta : String(resposta.resposta);
      
      switch (resposta.swotClassificacao) {
        case 'Força':
          forcas.push(texto);
          break;
        case 'Fraqueza':
          fraquezas.push(texto);
          break;
        case 'Oportunidade':
          oportunidades.push(texto);
          break;
        case 'Ameaça':
          ameacas.push(texto);
          break;
      }
    }
  });

  return { forcas, fraquezas, oportunidades, ameacas };
};
