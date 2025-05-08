export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cash_collect: {
        Row: {
          atual: number
          created_at: string
          id: string
          meta: number
          total: number
          updated_at: string
          value: number
        }
        Insert: {
          atual?: number
          created_at?: string
          id?: string
          meta?: number
          total?: number
          updated_at?: string
          value?: number
        }
        Update: {
          atual?: number
          created_at?: string
          id?: string
          meta?: number
          total?: number
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      daily_activity: {
        Row: {
          created_at: string
          date: string
          id: string
          leads: number
          meetings: number
          sales: number
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          leads?: number
          meetings?: number
          sales?: number
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          leads?: number
          meetings?: number
          sales?: number
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      diagnostic_results: {
        Row: {
          action_plan: Json | null
          answers_data: Json
          created_at: string
          id: string
          results: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          action_plan?: Json | null
          answers_data: Json
          created_at?: string
          id?: string
          results: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          action_plan?: Json | null
          answers_data?: Json
          created_at?: string
          id?: string
          results?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fase_results: {
        Row: {
          created_at: string
          description: string | null
          id: string
          phase_name: string
          recommendations: string | null
          score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          phase_name: string
          recommendations?: string | null
          score: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          phase_name?: string
          recommendations?: string | null
          score?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fase_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          faturamento: number
          faturamento_atual: number
          id: string
          receita: number
          receita_atual: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          faturamento?: number
          faturamento_atual?: number
          id?: string
          receita?: number
          receita_atual?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          faturamento?: number
          faturamento_atual?: number
          id?: string
          receita?: number
          receita_atual?: number
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone: string
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      mapa_equipe: {
        Row: {
          colaboradores: Json
          created_at: string
          empresa_nome: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          colaboradores: Json
          created_at?: string
          empresa_nome: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          colaboradores?: Json
          created_at?: string
          empresa_nome?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mapa_equipe_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_admin: boolean
          is_new_user: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_admin?: boolean
          is_new_user?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean
          is_new_user?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      projections: {
        Row: {
          created_at: string
          faturamento_meta: number
          faturamento_percentage: string
          faturamento_value: number
          id: string
          receita_meta: number
          receita_percentage: string
          receita_value: number
          ticket_medio_faturamento: number
          ticket_medio_receita: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          faturamento_meta?: number
          faturamento_percentage?: string
          faturamento_value?: number
          id?: string
          receita_meta?: number
          receita_percentage?: string
          receita_value?: number
          ticket_medio_faturamento?: number
          ticket_medio_receita?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          faturamento_meta?: number
          faturamento_percentage?: string
          faturamento_value?: number
          id?: string
          receita_meta?: number
          receita_percentage?: string
          receita_value?: number
          ticket_medio_faturamento?: number
          ticket_medio_receita?: number
          updated_at?: string
        }
        Relationships: []
      }
      sales_data: {
        Row: {
          created_at: string
          date: string
          id: string
          meta: number
          projecao: number
          updated_at: string
          vendas: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meta?: number
          projecao?: number
          updated_at?: string
          vendas?: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meta?: number
          projecao?: number
          updated_at?: string
          vendas?: number
        }
        Relationships: []
      }
      sales_stats: {
        Row: {
          conversao: number
          created_at: string
          faturamento: number
          id: string
          meta_faturamento: number
          meta_receita: number
          receita: number
          updated_at: string
          value: number
        }
        Insert: {
          conversao?: number
          created_at?: string
          faturamento?: number
          id?: string
          meta_faturamento?: number
          meta_receita?: number
          receita?: number
          updated_at?: string
          value?: number
        }
        Update: {
          conversao?: number
          created_at?: string
          faturamento?: number
          id?: string
          meta_faturamento?: number
          meta_receita?: number
          receita?: number
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      team: {
        Row: {
          created_at: string
          id: string
          sdrs: number
          updated_at: string
          vendedores: number
        }
        Insert: {
          created_at?: string
          id?: string
          sdrs?: number
          updated_at?: string
          vendedores?: number
        }
        Update: {
          created_at?: string
          id?: string
          sdrs?: number
          updated_at?: string
          vendedores?: number
        }
        Relationships: []
      }
      team_performance: {
        Row: {
          created_at: string
          date: string
          id: string
          updated_at: string
          value: number
          vendedor: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          updated_at?: string
          value?: number
          vendedor: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          updated_at?: string
          value?: number
          vendedor?: string
        }
        Relationships: []
      }
      user_modules: {
        Row: {
          created_at: string
          id: string
          module_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          module_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_modules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tools_data: {
        Row: {
          business_map_data: Json | null
          checklist_data: Json | null
          created_at: string
          crm_data: Json | null
          id: string
          puv_data: Json | null
          swot_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_map_data?: Json | null
          checklist_data?: Json | null
          created_at?: string
          crm_data?: Json | null
          id?: string
          puv_data?: Json | null
          swot_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_map_data?: Json | null
          checklist_data?: Json | null
          created_at?: string
          crm_data?: Json | null
          id?: string
          puv_data?: Json | null
          swot_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
