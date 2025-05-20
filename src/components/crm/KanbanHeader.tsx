
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KanbanHeaderProps {
  onAddNew: () => void;
  onManageColumns: () => void;
  onConfigureWebhook?: () => void;
  hasWebhookConfigured?: boolean;
}

const KanbanHeader = ({ 
  onAddNew, 
  onManageColumns,
  onConfigureWebhook,
  hasWebhookConfigured
}: KanbanHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">CRM - Gestão de Leads</h1>
      <div className="flex space-x-2">
        <TooltipProvider>
          {onConfigureWebhook && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={onConfigureWebhook}
                >
                  {hasWebhookConfigured ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                      Webhook
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Webhook
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{hasWebhookConfigured 
                  ? "Webhook configurado - Editar" 
                  : "Configurar webhook para notificações"}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={onManageColumns}
              >
                <Settings className="w-4 h-4 mr-1" />
                Colunas
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gerenciar colunas do CRM</p>
            </TooltipContent>
          </Tooltip>
          
          <Button
            size="sm"
            className="flex items-center"
            onClick={onAddNew}
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Novo Lead
          </Button>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default KanbanHeader;
