
export interface ActionCalendar {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  responsible_person: string;
  department: string;
  due_date: string;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'atrasada';
  details?: string;
  is_public: boolean;
  share_token: string;
  created_at: string;
  updated_at: string;
}

export interface CreateActionData {
  title: string;
  description?: string;
  responsible_person: string;
  department: string;
  due_date: string;
  status?: 'pendente' | 'em_andamento' | 'concluida' | 'atrasada';
  details?: string;
  is_public?: boolean;
}

export interface ActionFilters {
  status?: string;
  department?: string;
  responsible_person?: string;
  date_range?: {
    start: string;
    end: string;
  };
}
