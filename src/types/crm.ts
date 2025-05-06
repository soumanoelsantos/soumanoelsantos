
export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  notes: string | null;
  source: string | null;
}

export interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: string;
}
