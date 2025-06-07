
import React from 'react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionPlanPdfContentProps {
  companyName: string;
  actions: ActionItem[];
}

const ActionPlanPdfContent = ({ companyName, actions }: ActionPlanPdfContentProps) => {
  const groupedActions = actions.reduce((acc, action) => {
    if (!acc[action.categoria]) {
      acc[action.categoria] = [];
    }
    acc[action.categoria].push(action);
    return acc;
  }, {} as Record<string, ActionItem[]>);

  const categoryNames = {
    comercial: 'Comercial e Vendas',
    marketing: 'Marketing Digital',
    gestao: 'Gestão Estratégica',
    financeiro: 'Financeiro',
    rh: 'Recursos Humanos',
    operacional: 'Operacional',
    tecnologia: 'Tecnologia e Inovação',
    cultura: 'Cultura Organizacional',
    relacionamento: 'Relacionamento e Networking',
    produto: 'Produto e Desenvolvimento',
    "sucesso-cliente": 'Sucesso do Cliente'
  };

  const priorityColors = {
    alta: '#ef4444',
    media: '#f59e0b',
    baixa: '#10b981'
  };

  const statusNames = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    realizado: 'Realizado',
    atrasado: 'Atrasado'
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      color: 'black', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      lineHeight: '1.3',
      maxWidth: 'none',
      margin: '0'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '25px', 
        borderBottom: '2px solid #ccc', 
        paddingBottom: '15px' 
      }}>
        <h1 style={{ 
          fontSize: '22px', 
          fontWeight: 'bold', 
          color: 'black', 
          marginBottom: '8px',
          margin: '0 0 8px 0'
        }}>
          Plano de Aceleração Empresarial Completo
        </h1>
        <h2 style={{ 
          fontSize: '16px', 
          color: '#333', 
          marginBottom: '12px',
          margin: '0 0 12px 0'
        }}>{companyName}</h2>
        <div style={{ fontSize: '10px', color: '#666' }}>
          <p style={{ margin: '3px 0' }}>Total de ações estratégicas: {actions.length}</p>
          <p style={{ margin: '3px 0' }}>Data de geração: {new Date().toLocaleDateString('pt-BR')}</p>
          <p style={{ margin: '3px 0' }}>Plano desenvolvido para acelerar o crescimento e competitividade</p>
        </div>
      </div>

      {/* Statistics Summary */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color: 'black', 
          marginBottom: '12px',
          margin: '0 0 12px 0'
        }}>Resumo Executivo</h3>
        
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '8px', 
            borderRadius: '5px',
            minWidth: '120px'
          }}>
            <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0 3px 0', fontSize: '10px' }}>Total de Ações</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'black', margin: '0' }}>{actions.length}</p>
          </div>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '8px', 
            borderRadius: '5px',
            minWidth: '120px'
          }}>
            <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0 3px 0', fontSize: '10px' }}>Categorias</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'black', margin: '0' }}>{Object.keys(groupedActions).length}</p>
          </div>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '8px', 
            borderRadius: '5px',
            minWidth: '120px'
          }}>
            <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0 3px 0', fontSize: '10px' }}>Prioridade Alta</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444', margin: '0' }}>
              {actions.filter(a => a.prioridade === 'alta').length}
            </p>
          </div>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <h4 style={{ 
            fontWeight: 'bold', 
            color: 'black', 
            marginBottom: '8px',
            fontSize: '12px',
            margin: '0 0 8px 0'
          }}>Distribuição por Categoria</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            {Object.entries(groupedActions).map(([categoria, categoryActions]) => (
              <div key={categoria} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '3px 0', 
                borderBottom: '1px solid #eee',
                fontSize: '10px'
              }}>
                <span style={{ color: 'black' }}>{categoryNames[categoria as keyof typeof categoryNames]}</span>
                <span style={{ fontWeight: 'bold', color: 'black' }}>{categoryActions.length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions by Category - TODAS AS AÇÕES */}
      {Object.entries(groupedActions).map(([categoria, categoryActions]) => (
        <div key={categoria} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: 'black', 
            marginBottom: '12px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '4px',
            margin: '0 0 12px 0'
          }}>
            {categoryNames[categoria as keyof typeof categoryNames]} ({categoryActions.length} ações)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* REMOVER A LIMITAÇÃO - MOSTRAR TODAS AS AÇÕES */}
            {categoryActions.map((action, index) => (
              <div key={action.id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                padding: '10px', 
                backgroundColor: 'white',
                pageBreakInside: 'avoid',
                marginBottom: '6px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '6px',
                  flexWrap: 'wrap'
                }}>
                  <h4 style={{ 
                    fontWeight: 'bold', 
                    color: 'black', 
                    fontSize: '11px',
                    flex: '1',
                    marginRight: '8px',
                    margin: '0 8px 0 0'
                  }}>
                    {index + 1}. {action.acao}
                  </h4>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px', 
                      fontSize: '9px', 
                      color: 'white', 
                      fontWeight: 'bold',
                      backgroundColor: priorityColors[action.prioridade]
                    }}>
                      {action.prioridade.charAt(0).toUpperCase() + action.prioridade.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '8px', 
                  fontSize: '10px', 
                  color: 'black', 
                  marginBottom: '6px'
                }}>
                  <div>
                    <strong style={{ color: 'black' }}>Responsável:</strong> {action.responsavel}
                  </div>
                  <div>
                    <strong style={{ color: 'black' }}>Prazo:</strong> {action.prazo}
                  </div>
                  <div>
                    <strong style={{ color: 'black' }}>Status:</strong> {statusNames[action.status]}
                  </div>
                  <div>
                    <strong style={{ color: 'black' }}>Semana:</strong> {action.semana}
                  </div>
                </div>

                <div style={{ marginBottom: '6px' }}>
                  <strong style={{ color: 'black', fontSize: '10px' }}>Recursos Necessários:</strong>
                  <p style={{ fontSize: '9px', color: 'black', margin: '2px 0 0 0' }}>{action.recursos}</p>
                </div>

                <div style={{ marginBottom: '6px' }}>
                  <strong style={{ color: 'black', fontSize: '10px' }}>Benefícios Esperados:</strong>
                  <p style={{ fontSize: '9px', color: 'black', margin: '2px 0 0 0' }}>{action.beneficios}</p>
                </div>

                <div style={{ marginBottom: '6px' }}>
                  <strong style={{ color: 'black', fontSize: '10px' }}>Métricas de Sucesso:</strong>
                  <p style={{ fontSize: '9px', color: 'black', margin: '2px 0 0 0' }}>{action.metricas}</p>
                </div>

                {action.comoFazer && action.comoFazer.length > 0 && (
                  <div style={{ marginBottom: '6px' }}>
                    <strong style={{ color: 'black', fontSize: '10px' }}>Passos para Implementação:</strong>
                    <ol style={{ 
                      listStyleType: 'decimal', 
                      paddingLeft: '15px', 
                      fontSize: '9px', 
                      color: 'black', 
                      margin: '3px 0 0 0'
                    }}>
                      {action.comoFazer.map((step, stepIndex) => (
                        <li key={stepIndex} style={{ 
                          color: 'black', 
                          marginBottom: '2px'
                        }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {action.dicaIA && (
                  <div style={{ 
                    backgroundColor: '#f0f9ff', 
                    padding: '6px', 
                    borderRadius: '3px',
                    border: '1px solid #bfdbfe'
                  }}>
                    <strong style={{ color: 'black', fontSize: '10px' }}>💡 Dica Estratégica:</strong>
                    <p style={{ fontSize: '9px', color: 'black', margin: '2px 0 0 0' }}>{action.dicaIA}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px', 
        paddingTop: '15px', 
        borderTop: '1px solid #ccc'
      }}>
        <p style={{ fontSize: '11px', color: '#666', margin: '0 0 4px 0' }}>
          Plano de Aceleração Empresarial gerado em {new Date().toLocaleDateString('pt-BR')}
        </p>
        <p style={{ fontSize: '10px', color: '#666', margin: '0 0 4px 0' }}>
          {companyName} - {actions.length} ações estratégicas para acelerar o crescimento
        </p>
        <p style={{ fontSize: '9px', color: '#999', margin: '0' }}>
          Este plano foi desenvolvido especificamente para impulsionar a competitividade e o crescimento sustentável
        </p>
      </div>
    </div>
  );
};

export default ActionPlanPdfContent;
