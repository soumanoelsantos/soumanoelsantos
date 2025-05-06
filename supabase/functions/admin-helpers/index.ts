
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Parse the request body as JSON
    const requestBody = await req.json();
    const { action } = requestBody || { action: '' };

    // Create a Supabase client with service role key for admin operations
    // This bypasses RLS and directly accesses the database
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}` },
        },
      }
    )

    let result;
    
    // Handle different admin functions based on the action parameter
    switch (action) {
      case 'listProfiles':
        // Get all profiles directly from the database
        const { data: profiles, error: profilesError } = await adminClient
          .from('profiles')
          .select('*')
            
        if (profilesError) {
          throw profilesError
        }
            
        // Get user modules to include in the response
        const { data: modules, error: modulesError } = await adminClient
          .from('user_modules')
          .select('*')
            
        if (modulesError) {
          throw modulesError
        }
            
        // Format profiles with module access
        result = profiles.map(profile => {
          const userModules = modules
            .filter(m => m.user_id === profile.id)
            .map(m => m.module_id)
            
          return {
            id: profile.id,
            email: profile.email || '',
            isNewUser: profile.is_new_user || false,
            isAdmin: profile.is_admin || false,
            unlockedModules: userModules
          }
        })
        break
            
      case 'listUsers':
        // Get all users from the auth API
        const { data: users, error: usersError } = await adminClient.auth.admin.listUsers()
            
        if (usersError) {
          throw usersError
        }
            
        result = users
        break
      
      case 'listTables':
        // Get all tables in the database using PostgreSQL's information_schema
        // This is safer than using custom functions that might not exist
        const { data: tables, error: tablesError } = await adminClient
          .from('pg_catalog.pg_tables')
          .select('tablename')
          .eq('schemaname', 'public')
        
        if (tablesError) {
          console.error('Error fetching tables:', tablesError)
          throw tablesError
        }
        
        // Extract table names from result
        result = tables.map(t => t.tablename)
        break
        
      case 'executeQuery':
        // Execute a raw SQL query - WITH EXTREME CAUTION
        const { query, params } = requestBody;
        
        if (!query) {
          throw new Error('Query is required')
        }
        
        // Execute the query directly since we have admin privileges
        const { data: queryResult, error: queryError } = await adminClient.rpc(
          'execute_sql', 
          { query_text: query, query_params: params || [] }
        )
        
        if (queryError) {
          console.error('Error executing query:', queryError)
          throw queryError
        }
        
        result = queryResult
        break
        
      default:
        throw new Error('Invalid action')
    }

    // Return the result
    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in admin-helpers edge function:', error)
    // Return error with appropriate status code
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
