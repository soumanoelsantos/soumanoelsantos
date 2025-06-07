
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
    comercial: 'Comercial',
    marketing: 'Marketing',
    gestao: 'Gestão',
    financeiro: 'Financeiro',
    rh: 'Recursos Humanos',
    operacional: 'Operacional',
    tecnologia: 'Tecnologia',
    cultura: 'Cultura Organizacional'
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
      fontSize: '12px',
      lineHeight: '1.4',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        borderBottom: '2px solid #ccc', 
        paddingBottom: '20px' 
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'black', 
          marginBottom: '10px',
          margin: '0 0 10px 0'
        }}>
          Plano de Aceleração Empresarial
        </h1>
        <h2 style={{ 
          fontSize: '18px', 
          color: '#333', 
          marginBottom: '15px',
          margin: '0 0 15px 0'
        }}>{companyName}</h2>
        <div style={{ fontSize: '11px', color: '#666' }}>
          <p style={{ margin: '5px 0' }}>Total de ações: {actions.length}</p>
          <p style={{ margin: '5px 0' }}>Data de geração: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {/* Statistics Summary */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: 'black', 
          marginBottom: '15px',
          margin: '0 0 15px 0'
        }}>Resumo Executivo</h3>
        
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '15px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            borderRadius: '5px',
            minWidth: '150px'
          }}>
            <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0 5px 0' }}>Total de Ações</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', margin: '0' }}>{actions.length}</p>
          </div>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            borderRadius: '5px',
            minWidth: '150px'
          }}>
            <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0 5px 0' }}>Categorias</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', margin: '0' }}>{Object.keys(groupedActions).length}</p>
          </div>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ 
            fontWeight: 'bold', 
            color: 'black', 
            marginBottom: '10px',
            fontSize: '14px',
            margin: '0 0 10px 0'
          }}>Distribuição por Categoria</h4>
          {Object.entries(groupedActions).map(([categoria, categoryActions]) => (
            <div key={categoria} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '5px 0', 
              borderBottom: '1px solid #eee'
            }}>
              <span style={{ color: 'black' }}>{categoryNames[categoria as keyof typeof categoryNames]}</span>
              <span style={{ fontWeight: 'bold', color: 'black' }}>{categoryActions.length} ações</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions by Category */}
      {Object.entries(groupedActions).map(([categoria, categoryActions]) => (
        <div key={categoria} style={{ marginBottom: '30px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: 'black', 
            marginBottom: '15px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '5px',
            margin: '0 0 15px 0'
          }}>
            {categoryNames[categoria as keyof typeof categoryNames]}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {categoryActions.slice(0, 20).map((action, index) => (
              <div key={action.id} style={{ 
                border: '1px solid #ccc', 
                borderRadius: '5px', 
                padding: '15px', 
                backgroundColor: 'white',
                pageBreakInside: 'avoid'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '10px',
                  flexWrap: 'wrap'
                }}>
                  <h4 style={{ 
                    fontWeight: 'bold', 
                    color: 'black', 
                    fontSize: '13px',
                    flex: '1',
                    marginRight: '10px',
                    margin: '0 10px 0 0'
                  }}>
                    {index + 1}. {action.acao}
                  </h4>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ 
                      padding: '3px 8px', 
                      borderRadius: '3px', 
                      fontSize: '10px', 
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
                  gap: '10px', 
                  fontSize: '11px', 
                  color: 'black', 
                  marginBottom: '10px'
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
                    <strong style={{ color: 'black' }}>Recursos:</strong> {action.recursos}
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'black', fontSize: '11px' }}>Benefícios:</strong>
                  <p style={{ fontSize: '11px', color: 'black', margin: '3px 0 0 0' }}>{action.beneficios}</p>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'black', fontSize: '11px' }}>Métricas:</strong>
                  <p style={{ fontSize: '11px', color: 'black', margin: '3px 0 0 0' }}>{action.metricas}</p>
                </div>

                {action.comoFazer && action.comoFazer.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: 'black', fontSize: '11px' }}>Como fazer na prática:</strong>
                    <ol style={{ 
                      listStyleType: 'decimal', 
                      paddingLeft: '20px', 
                      fontSize: '11px', 
                      color: 'black', 
                      margin: '5px 0 0 0'
                    }}>
                      {action.comoFazer.map((step, stepIndex) => (
                        <li key={stepIndex} style={{ 
                          color: 'black', 
                          marginBottom: '3px'
                        }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {action.dicaIA && (
                  <div style={{ 
                    backgroundColor: '#e3f2fd', 
                    padding: '8px', 
                    borderRadius: '3px',
                    border: '1px solid #bbdefb'
                  }}>
                    <strong style={{ color: 'black', fontSize: '11px' }}>💡 Dica da IA:</strong>
                    <p style={{ fontSize: '11px', color: 'black', margin: '3px 0 0 0' }}>{action.dicaIA}</p>
                  </div>
                )}
              </div>
            ))}
            
            {categoryActions.length > 20 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '15px', 
                borderTop: '1px solid #ccc'
              }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
                  E mais {categoryActions.length - 20} ações nesta categoria...
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid #ccc'
      }}>
        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>
          Plano gerado em {new Date().toLocaleDateString('pt-BR')} - {companyName}
        </p>
        <p style={{ fontSize: '10px', color: '#999', margin: '0' }}>
          Este plano foi criado especificamente para acelerar o crescimento da sua empresa
        </p>
      </div>
    </div>
  );
};

export default ActionPlanPdfContent;
