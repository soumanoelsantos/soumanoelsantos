
import { supabase } from "@/integrations/supabase/client";

// Direct table management - for full admin access
export const executeRawQuery = async (query: string, params?: any[]): Promise<{ data: any, error: any }> => {
  try {
    // Call the edge function to execute the query
    const { data, error } = await supabase.functions.invoke('admin-helpers', {
      body: { action: 'executeQuery', query, params: params || [] }
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error executing raw query:", error);
    return { data: null, error };
  }
};

// Direct access to get list of tables
export const fetchAllTables = async (): Promise<{ data: string[], error: any }> => {
  try {
    // Use edge function to fetch tables
    const { data, error } = await supabase.functions.invoke('admin-helpers', {
      body: { action: 'listTables' }
    });
    
    if (error) throw error;
    
    // Ensure we return an array of strings
    return { data: Array.isArray(data) ? data : [], error: null };
  } catch (error) {
    console.error("Error fetching tables:", error);
    return { data: [], error };
  }
};

// Fetch data from a specific table
export const fetchTableData = async (tableName: string, limit: number = 100): Promise<{ data: any[], columns: string[], error: any }> => {
  try {
    const { data, error } = await executeRawQuery(`SELECT * FROM ${tableName} LIMIT ${limit};`);
    
    if (error) throw error;
    
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
    
    return { 
      data: data || [], 
      columns,
      error: null 
    };
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    return { 
      data: [],
      columns: [],
      error 
    };
  }
};

// Download data as JSON
export const prepareDataForDownload = (data: any[]): string => {
  return JSON.stringify(data, null, 2);
};
