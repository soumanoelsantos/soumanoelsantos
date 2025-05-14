
export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  notes: string | null;
  source: string | null;
  status_changed_at?: string; // Timestamp for when status was last changed
  updated_at?: string;
}

export interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: string;
}

export interface CrmColumn {
  id: string;
  name: string;
  order: number;
}
