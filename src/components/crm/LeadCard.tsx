
import React from "react";
import { Edit, Trash2, Mail, Phone, Calendar } from "lucide-react";

interface LeadCardProps {
  lead: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    created_at: string;
    notes: string | null;
    source: string | null;
  };
  onEdit: (lead: LeadCardProps["lead"]) => void;
  onDelete: (id: string) => void;
}

const LeadCard = ({ lead, onEdit, onDelete }: LeadCardProps) => {
  return (
    <div className="bg-white rounded-md p-4 mb-3 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{lead.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(lead)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-1">
          <Mail size={12} />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone size={12} />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>
            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
        {lead.source && (
          <div className="flex items-center gap-1 mt-1">
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {lead.source}
            </span>
          </div>
        )}
      </div>
      
      {lead.notes && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600">{lead.notes}</p>
        </div>
      )}
    </div>
  );
};

export default LeadCard;
