
import React from "react";
import { Edit, Trash2, Mail, Phone, Calendar, TagIcon, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadCardProps {
  lead: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    created_at: string;
    status_changed_at?: string;
    notes: string | null;
    source: string | null;
  };
  onEdit: (lead: LeadCardProps["lead"]) => void;
  onDelete: (id: string) => void;
}

const LeadCard = ({ lead, onEdit, onDelete }: LeadCardProps) => {
  // Calculate how long the lead has been in the current status
  const timeInStatus = lead.status_changed_at 
    ? formatDistanceToNow(new Date(lead.status_changed_at), { addSuffix: false, locale: ptBR })
    : formatDistanceToNow(new Date(lead.created_at), { addSuffix: false, locale: ptBR });

  return (
    <Card className="bg-white rounded-md p-4 mb-3 shadow-sm border border-gray-100 overflow-hidden relative">
      {/* Edit and delete buttons positioned at the top left */}
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        <button
          onClick={() => onEdit(lead)}
          className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-sm"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="text-gray-500 hover:text-red-500 bg-white rounded-full p-1 shadow-sm"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium text-gray-800 truncate">{lead.name}</h3>
        
        <div className="text-xs text-gray-500 space-y-1 mt-2">
          <div className="flex items-center gap-1 truncate">
            <Mail size={12} className="shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone size={12} className="shrink-0" />
            <span>{lead.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} className="shrink-0" />
            <span>
              {new Date(lead.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} className="shrink-0" />
            <span className="text-gray-600">
              {timeInStatus} na coluna atual
            </span>
          </div>
          {lead.source && (
            <div className="flex items-center gap-1 mt-1">
              <TagIcon size={12} className="shrink-0" />
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs truncate">
                {lead.source}
              </span>
            </div>
          )}
        </div>
        
        {lead.notes && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600 line-clamp-2 break-words">{lead.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LeadCard;
