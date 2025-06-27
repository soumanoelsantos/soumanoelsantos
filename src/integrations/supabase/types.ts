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
      action_calendar: {
        Row: {
          created_at: string
          department: string
          description: string | null
          details: string | null
          due_date: string
          id: string
          is_public: boolean
          responsible_person: string
          share_token: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department: string
          description?: string | null
          details?: string | null
          due_date: string
          id?: string
          is_public?: boolean
          responsible_person: string
          share_token?: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string | null
          details?: string | null
          due_date?: string
          id?: string
          is_public?: boolean
          responsible_person?: string
          share_token?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action_type: string
          created_at: string | null
          details: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
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
      dashboard_configs: {
        Row: {
          company_name: string | null
          created_at: string
          enable_commercial_tab: boolean | null
          enable_pre_sales_tab: boolean | null
          enable_product_tab: boolean | null
          id: string
          is_public: boolean | null
          metrics_order: Json | null
          pre_sales_order: Json | null
          product_order: Json | null
          selected_goal_ids: Json | null
          selected_product_ids: Json | null
          share_token: string | null
          show_billing_evolution_chart: boolean | null
          show_cac: boolean | null
          show_calls_diarias: boolean | null
          show_cash_collect: boolean | null
          show_charts: boolean | null
          show_closers_performance_table: boolean | null
          show_conversao: boolean | null
          show_conversion: boolean | null
          show_diaria_faturamento: boolean | null
          show_diaria_receita: boolean | null
          show_falta_faturamento: boolean | null
          show_falta_faturamento_hiper: boolean | null
          show_falta_faturamento_super: boolean | null
          show_falta_receita: boolean | null
          show_falta_receita_hiper: boolean | null
          show_falta_receita_super: boolean | null
          show_faturamento: boolean | null
          show_hiper_meta_faturamento: boolean | null
          show_hiper_meta_receita: boolean | null
          show_leads: boolean | null
          show_meta_faturamento: boolean | null
          show_meta_receita: boolean | null
          show_monthly_goals: boolean | null
          show_no_show: boolean | null
          show_pre_sales_calls: boolean | null
          show_pre_sales_calls_chart: boolean | null
          show_pre_sales_no_show: boolean | null
          show_pre_sales_no_show_chart: boolean | null
          show_pre_sales_scheduling_chart: boolean | null
          show_pre_sales_schedulings: boolean | null
          show_pre_sales_sdr_comparison_chart: boolean | null
          show_pre_sales_sdr_table: boolean | null
          show_product_billing_evolution_chart: boolean | null
          show_product_cash_collect: boolean | null
          show_product_comparison_chart: boolean | null
          show_product_diaria_faturamento: boolean | null
          show_product_diaria_receita: boolean | null
          show_product_falta_faturamento: boolean | null
          show_product_falta_receita: boolean | null
          show_product_faturamento: boolean | null
          show_product_meta_faturamento: boolean | null
          show_product_meta_quantidade_vendas: boolean | null
          show_product_meta_receita: boolean | null
          show_product_metrics: boolean | null
          show_product_performance_chart: boolean | null
          show_product_projecao_faturamento: boolean | null
          show_product_projecao_receita: boolean | null
          show_product_quantidade_vendas: boolean | null
          show_product_receita: boolean | null
          show_product_revenue_evolution_chart: boolean | null
          show_product_sales_evolution_chart: boolean | null
          show_product_temporal_chart: boolean | null
          show_product_ticket_faturamento: boolean | null
          show_product_ticket_receita: boolean | null
          show_projecao_faturamento: boolean | null
          show_projecao_receita: boolean | null
          show_quantidade_vendas: boolean | null
          show_receita: boolean | null
          show_revenue: boolean | null
          show_revenue_evolution_chart: boolean | null
          show_sales: boolean | null
          show_seller_billing_chart: boolean | null
          show_seller_revenue_chart: boolean | null
          show_specific_goals: boolean | null
          show_super_meta_faturamento: boolean | null
          show_super_meta_receita: boolean | null
          show_team: boolean | null
          show_temporal_billing_chart: boolean | null
          show_temporal_revenue_chart: boolean | null
          show_ticket_faturamento: boolean | null
          show_ticket_medio: boolean | null
          show_ticket_receita: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          enable_commercial_tab?: boolean | null
          enable_pre_sales_tab?: boolean | null
          enable_product_tab?: boolean | null
          id?: string
          is_public?: boolean | null
          metrics_order?: Json | null
          pre_sales_order?: Json | null
          product_order?: Json | null
          selected_goal_ids?: Json | null
          selected_product_ids?: Json | null
          share_token?: string | null
          show_billing_evolution_chart?: boolean | null
          show_cac?: boolean | null
          show_calls_diarias?: boolean | null
          show_cash_collect?: boolean | null
          show_charts?: boolean | null
          show_closers_performance_table?: boolean | null
          show_conversao?: boolean | null
          show_conversion?: boolean | null
          show_diaria_faturamento?: boolean | null
          show_diaria_receita?: boolean | null
          show_falta_faturamento?: boolean | null
          show_falta_faturamento_hiper?: boolean | null
          show_falta_faturamento_super?: boolean | null
          show_falta_receita?: boolean | null
          show_falta_receita_hiper?: boolean | null
          show_falta_receita_super?: boolean | null
          show_faturamento?: boolean | null
          show_hiper_meta_faturamento?: boolean | null
          show_hiper_meta_receita?: boolean | null
          show_leads?: boolean | null
          show_meta_faturamento?: boolean | null
          show_meta_receita?: boolean | null
          show_monthly_goals?: boolean | null
          show_no_show?: boolean | null
          show_pre_sales_calls?: boolean | null
          show_pre_sales_calls_chart?: boolean | null
          show_pre_sales_no_show?: boolean | null
          show_pre_sales_no_show_chart?: boolean | null
          show_pre_sales_scheduling_chart?: boolean | null
          show_pre_sales_schedulings?: boolean | null
          show_pre_sales_sdr_comparison_chart?: boolean | null
          show_pre_sales_sdr_table?: boolean | null
          show_product_billing_evolution_chart?: boolean | null
          show_product_cash_collect?: boolean | null
          show_product_comparison_chart?: boolean | null
          show_product_diaria_faturamento?: boolean | null
          show_product_diaria_receita?: boolean | null
          show_product_falta_faturamento?: boolean | null
          show_product_falta_receita?: boolean | null
          show_product_faturamento?: boolean | null
          show_product_meta_faturamento?: boolean | null
          show_product_meta_quantidade_vendas?: boolean | null
          show_product_meta_receita?: boolean | null
          show_product_metrics?: boolean | null
          show_product_performance_chart?: boolean | null
          show_product_projecao_faturamento?: boolean | null
          show_product_projecao_receita?: boolean | null
          show_product_quantidade_vendas?: boolean | null
          show_product_receita?: boolean | null
          show_product_revenue_evolution_chart?: boolean | null
          show_product_sales_evolution_chart?: boolean | null
          show_product_temporal_chart?: boolean | null
          show_product_ticket_faturamento?: boolean | null
          show_product_ticket_receita?: boolean | null
          show_projecao_faturamento?: boolean | null
          show_projecao_receita?: boolean | null
          show_quantidade_vendas?: boolean | null
          show_receita?: boolean | null
          show_revenue?: boolean | null
          show_revenue_evolution_chart?: boolean | null
          show_sales?: boolean | null
          show_seller_billing_chart?: boolean | null
          show_seller_revenue_chart?: boolean | null
          show_specific_goals?: boolean | null
          show_super_meta_faturamento?: boolean | null
          show_super_meta_receita?: boolean | null
          show_team?: boolean | null
          show_temporal_billing_chart?: boolean | null
          show_temporal_revenue_chart?: boolean | null
          show_ticket_faturamento?: boolean | null
          show_ticket_medio?: boolean | null
          show_ticket_receita?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          enable_commercial_tab?: boolean | null
          enable_pre_sales_tab?: boolean | null
          enable_product_tab?: boolean | null
          id?: string
          is_public?: boolean | null
          metrics_order?: Json | null
          pre_sales_order?: Json | null
          product_order?: Json | null
          selected_goal_ids?: Json | null
          selected_product_ids?: Json | null
          share_token?: string | null
          show_billing_evolution_chart?: boolean | null
          show_cac?: boolean | null
          show_calls_diarias?: boolean | null
          show_cash_collect?: boolean | null
          show_charts?: boolean | null
          show_closers_performance_table?: boolean | null
          show_conversao?: boolean | null
          show_conversion?: boolean | null
          show_diaria_faturamento?: boolean | null
          show_diaria_receita?: boolean | null
          show_falta_faturamento?: boolean | null
          show_falta_faturamento_hiper?: boolean | null
          show_falta_faturamento_super?: boolean | null
          show_falta_receita?: boolean | null
          show_falta_receita_hiper?: boolean | null
          show_falta_receita_super?: boolean | null
          show_faturamento?: boolean | null
          show_hiper_meta_faturamento?: boolean | null
          show_hiper_meta_receita?: boolean | null
          show_leads?: boolean | null
          show_meta_faturamento?: boolean | null
          show_meta_receita?: boolean | null
          show_monthly_goals?: boolean | null
          show_no_show?: boolean | null
          show_pre_sales_calls?: boolean | null
          show_pre_sales_calls_chart?: boolean | null
          show_pre_sales_no_show?: boolean | null
          show_pre_sales_no_show_chart?: boolean | null
          show_pre_sales_scheduling_chart?: boolean | null
          show_pre_sales_schedulings?: boolean | null
          show_pre_sales_sdr_comparison_chart?: boolean | null
          show_pre_sales_sdr_table?: boolean | null
          show_product_billing_evolution_chart?: boolean | null
          show_product_cash_collect?: boolean | null
          show_product_comparison_chart?: boolean | null
          show_product_diaria_faturamento?: boolean | null
          show_product_diaria_receita?: boolean | null
          show_product_falta_faturamento?: boolean | null
          show_product_falta_receita?: boolean | null
          show_product_faturamento?: boolean | null
          show_product_meta_faturamento?: boolean | null
          show_product_meta_quantidade_vendas?: boolean | null
          show_product_meta_receita?: boolean | null
          show_product_metrics?: boolean | null
          show_product_performance_chart?: boolean | null
          show_product_projecao_faturamento?: boolean | null
          show_product_projecao_receita?: boolean | null
          show_product_quantidade_vendas?: boolean | null
          show_product_receita?: boolean | null
          show_product_revenue_evolution_chart?: boolean | null
          show_product_sales_evolution_chart?: boolean | null
          show_product_temporal_chart?: boolean | null
          show_product_ticket_faturamento?: boolean | null
          show_product_ticket_receita?: boolean | null
          show_projecao_faturamento?: boolean | null
          show_projecao_receita?: boolean | null
          show_quantidade_vendas?: boolean | null
          show_receita?: boolean | null
          show_revenue?: boolean | null
          show_revenue_evolution_chart?: boolean | null
          show_sales?: boolean | null
          show_seller_billing_chart?: boolean | null
          show_seller_revenue_chart?: boolean | null
          show_specific_goals?: boolean | null
          show_super_meta_faturamento?: boolean | null
          show_super_meta_receita?: boolean | null
          show_team?: boolean | null
          show_temporal_billing_chart?: boolean | null
          show_temporal_revenue_chart?: boolean | null
          show_ticket_faturamento?: boolean | null
          show_ticket_medio?: boolean | null
          show_ticket_receita?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dev_conversations: {
        Row: {
          created_at: string
          id: string
          messages: Json
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dev_conversations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "dev_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dev_github_integrations: {
        Row: {
          auto_sync: boolean
          branch_name: string
          created_at: string
          github_token: string
          github_username: string
          id: string
          last_sync_at: string | null
          project_id: string
          repository_name: string
          repository_url: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_sync?: boolean
          branch_name?: string
          created_at?: string
          github_token: string
          github_username: string
          id?: string
          last_sync_at?: string | null
          project_id: string
          repository_name: string
          repository_url: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_sync?: boolean
          branch_name?: string
          created_at?: string
          github_token?: string
          github_username?: string
          id?: string
          last_sync_at?: string | null
          project_id?: string
          repository_name?: string
          repository_url?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dev_github_integrations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "dev_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dev_projects: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dev_sync_logs: {
        Row: {
          commit_hash: string | null
          created_at: string
          files_changed: number | null
          id: string
          integration_id: string
          message: string | null
          status: string
          sync_type: string
        }
        Insert: {
          commit_hash?: string | null
          created_at?: string
          files_changed?: number | null
          id?: string
          integration_id: string
          message?: string | null
          status: string
          sync_type: string
        }
        Update: {
          commit_hash?: string | null
          created_at?: string
          files_changed?: number | null
          id?: string
          integration_id?: string
          message?: string | null
          status?: string
          sync_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "dev_sync_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "dev_github_integrations"
            referencedColumns: ["id"]
          },
        ]
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
          answers: Json | null
          created_at: string
          description: string | null
          enhanced_action_plan: string[] | null
          id: string
          phase_name: string
          recommendations: string | null
          score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json | null
          created_at?: string
          description?: string | null
          enhanced_action_plan?: string[] | null
          id?: string
          phase_name: string
          recommendations?: string | null
          score: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json | null
          created_at?: string
          description?: string | null
          enhanced_action_plan?: string[] | null
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
      goal_types: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_percentage: boolean | null
          name: string
          target_scope: string
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_percentage?: boolean | null
          name: string
          target_scope: string
          unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_percentage?: boolean | null
          name?: string
          target_scope?: string
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
          status_changed_at: string | null
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
          status_changed_at?: string | null
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
          status_changed_at?: string | null
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
      mind_map_attachments: {
        Row: {
          attachment_type: string
          created_at: string
          file_name: string
          file_size: number
          file_type: string
          id: string
          mind_map_id: string
          node_id: string
          storage_path: string
          updated_at: string
        }
        Insert: {
          attachment_type: string
          created_at?: string
          file_name: string
          file_size: number
          file_type: string
          id?: string
          mind_map_id: string
          node_id: string
          storage_path: string
          updated_at?: string
        }
        Update: {
          attachment_type?: string
          created_at?: string
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          mind_map_id?: string
          node_id?: string
          storage_path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mind_map_attachments_mind_map_id_fkey"
            columns: ["mind_map_id"]
            isOneToOne: false
            referencedRelation: "mind_maps"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_maps: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_public: boolean
          share_token: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          is_public?: boolean
          share_token?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_public?: boolean
          share_token?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      monthly_goals: {
        Row: {
          created_at: string
          currency: string | null
          current_value: number
          financial_category: string | null
          goal_type: string
          id: string
          month: number
          product_id: string | null
          target_type: string
          target_value: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          currency?: string | null
          current_value?: number
          financial_category?: string | null
          goal_type: string
          id?: string
          month: number
          product_id?: string | null
          target_type: string
          target_value: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          currency?: string | null
          current_value?: number
          financial_category?: string | null
          goal_type?: string
          id?: string
          month?: number
          product_id?: string | null
          target_type?: string
          target_value?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "monthly_goals_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      planejamento_estrategico: {
        Row: {
          acoes_comerciais: Json | null
          created_at: string
          data_atualizacao: string
          data_inicio: string
          empresa_nome: string
          ferramentas_geradas: Json
          id: string
          plano_acao: Json
          progresso: number
          respostas: Json
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          acoes_comerciais?: Json | null
          created_at?: string
          data_atualizacao?: string
          data_inicio?: string
          empresa_nome: string
          ferramentas_geradas?: Json
          id?: string
          plano_acao?: Json
          progresso?: number
          respostas?: Json
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          acoes_comerciais?: Json | null
          created_at?: string
          data_atualizacao?: string
          data_inicio?: string
          empresa_nome?: string
          ferramentas_geradas?: Json
          id?: string
          plano_acao?: Json
          progresso?: number
          respostas?: Json
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pre_sales_goals: {
        Row: {
          created_at: string
          current_value: number
          goal_type_id: string | null
          id: string
          month: number
          seller_id: string | null
          target_value: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          current_value?: number
          goal_type_id?: string | null
          id?: string
          month: number
          seller_id?: string | null
          target_value: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          current_value?: number
          goal_type_id?: string | null
          id?: string
          month?: number
          seller_id?: string | null
          target_value?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "pre_sales_goals_goal_type_id_fkey"
            columns: ["goal_type_id"]
            isOneToOne: false
            referencedRelation: "goal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_sales_goals_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      process_documents: {
        Row: {
          category: string | null
          content: string
          created_at: string
          description: string | null
          file_name: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          folder_id: string | null
          id: string
          is_public: boolean
          share_token: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content?: string
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          folder_id?: string | null
          id?: string
          is_public?: boolean
          share_token?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          folder_id?: string | null
          id?: string
          is_public?: boolean
          share_token?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "process_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      process_folders: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          parent_folder_id: string | null
          share_token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          parent_folder_id?: string | null
          share_token?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          parent_folder_id?: string | null
          share_token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "process_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_goals: {
        Row: {
          billing_goal: number
          created_at: string
          currency: string
          id: string
          is_active: boolean
          product_id: string
          quantity_goal: number
          revenue_goal: number
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_goal?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          product_id: string
          quantity_goal?: number
          revenue_goal?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_goal?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          product_id?: string
          quantity_goal?: number
          revenue_goal?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_goals_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          updated_at?: string
          user_id?: string
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
      seller_daily_performance: {
        Row: {
          billing_amount: number | null
          calls_count: number | null
          created_at: string | null
          date: string
          id: string
          leads_count: number | null
          meetings_count: number | null
          notes: string | null
          revenue_amount: number | null
          sales_count: number | null
          seller_id: string
          submitted_at: string | null
          submitted_by_seller: boolean | null
          updated_at: string | null
        }
        Insert: {
          billing_amount?: number | null
          calls_count?: number | null
          created_at?: string | null
          date: string
          id?: string
          leads_count?: number | null
          meetings_count?: number | null
          notes?: string | null
          revenue_amount?: number | null
          sales_count?: number | null
          seller_id: string
          submitted_at?: string | null
          submitted_by_seller?: boolean | null
          updated_at?: string | null
        }
        Update: {
          billing_amount?: number | null
          calls_count?: number | null
          created_at?: string | null
          date?: string
          id?: string
          leads_count?: number | null
          meetings_count?: number | null
          notes?: string | null
          revenue_amount?: number | null
          sales_count?: number | null
          seller_id?: string
          submitted_at?: string | null
          submitted_by_seller?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_daily_performance_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_individual_sales: {
        Row: {
          billing_amount: number
          client_name: string
          created_at: string
          id: string
          performance_id: string
          product_id: string | null
          revenue_amount: number
          seller_id: string
          updated_at: string
        }
        Insert: {
          billing_amount?: number
          client_name: string
          created_at?: string
          id?: string
          performance_id: string
          product_id?: string | null
          revenue_amount?: number
          seller_id: string
          updated_at?: string
        }
        Update: {
          billing_amount?: number
          client_name?: string
          created_at?: string
          id?: string
          performance_id?: string
          product_id?: string | null
          revenue_amount?: number
          seller_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_seller_individual_sales_product"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seller_individual_sales_performance_id_fkey"
            columns: ["performance_id"]
            isOneToOne: false
            referencedRelation: "seller_daily_performance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seller_individual_sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seller_individual_sales_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_monthly_goals: {
        Row: {
          billing_goal: number | null
          created_at: string | null
          id: string
          month: number
          revenue_goal: number | null
          sales_goal: number | null
          seller_id: string
          updated_at: string | null
          year: number
        }
        Insert: {
          billing_goal?: number | null
          created_at?: string | null
          id?: string
          month: number
          revenue_goal?: number | null
          sales_goal?: number | null
          seller_id: string
          updated_at?: string | null
          year: number
        }
        Update: {
          billing_goal?: number | null
          created_at?: string | null
          id?: string
          month?: number
          revenue_goal?: number | null
          sales_goal?: number | null
          seller_id?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "seller_monthly_goals_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          access_token: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          seller_type: Database["public"]["Enums"]["seller_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          seller_type: Database["public"]["Enums"]["seller_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          seller_type?: Database["public"]["Enums"]["seller_type"]
          updated_at?: string | null
          user_id?: string
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
          mapa_equipe: Json | null
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
          mapa_equipe?: Json | null
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
          mapa_equipe?: Json | null
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
      current_user_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_seller_by_access_token: {
        Args: { token_param: string }
        Returns: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          seller_type: string
          is_active: boolean
          access_token: string
          created_at: string
          updated_at: string
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_admin_action: {
        Args: { action_type: string; details?: string }
        Returns: undefined
      }
    }
    Enums: {
      seller_type: "pap" | "sdr" | "closer" | "vendedor_interno" | "outro"
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
    Enums: {
      seller_type: ["pap", "sdr", "closer", "vendedor_interno", "outro"],
    },
  },
} as const
