
import { 
  TrendingUp, 
  Target, 
  Settings, 
  DollarSign, 
  Users, 
  Building, 
  Cpu, 
  Heart, 
  Handshake, 
  Package, 
  UserCheck 
} from 'lucide-react';

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'alta': return 'bg-red-100 text-red-800 border-red-200';
    case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente': return 'bg-gray-100 text-gray-800';
    case 'em_andamento': return 'bg-blue-100 text-blue-800';
    case 'realizado': return 'bg-green-100 text-green-800';
    case 'atrasado': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'comercial': return <TrendingUp className="h-4 w-4" />;
    case 'marketing': return <Target className="h-4 w-4" />;
    case 'gestao': return <Settings className="h-4 w-4" />;
    case 'financeiro': return <DollarSign className="h-4 w-4" />;
    case 'rh': return <Users className="h-4 w-4" />;
    case 'operacional': return <Building className="h-4 w-4" />;
    case 'tecnologia': return <Cpu className="h-4 w-4" />;
    case 'cultura': return <Heart className="h-4 w-4" />;
    case 'relacionamento': return <Handshake className="h-4 w-4" />;
    case 'produto': return <Package className="h-4 w-4" />;
    case 'sucesso-cliente': return <UserCheck className="h-4 w-4" />;
    default: return <Target className="h-4 w-4" />;
  }
};

export const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'comercial': return 'Comercial';
    case 'marketing': return 'Marketing';
    case 'gestao': return 'Gestão';
    case 'financeiro': return 'Financeiro';
    case 'rh': return 'Recursos Humanos';
    case 'operacional': return 'Operacional';
    case 'tecnologia': return 'Tecnologia';
    case 'cultura': return 'Cultura';
    case 'relacionamento': return 'Relacionamento';
    case 'produto': return 'Produto';
    case 'sucesso-cliente': return 'Sucesso do Cliente';
    default: return 'Geral';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'comercial': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'marketing': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'gestao': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'financeiro': return 'bg-green-100 text-green-800 border-green-200';
    case 'rh': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'operacional': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'tecnologia': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    case 'cultura': return 'bg-pink-100 text-pink-800 border-pink-200';
    case 'relacionamento': return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'produto': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'sucesso-cliente': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
