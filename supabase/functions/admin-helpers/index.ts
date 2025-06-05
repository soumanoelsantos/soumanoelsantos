
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

    // Get the current user session and verify authentication
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - No valid session' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }

    // Verify admin status using the security definer function
    const { data: isAdminResult, error: adminError } = await supabaseClient
      .rpc('current_user_is_admin')

    if (adminError || !isAdminResult) {
      console.error('Admin verification failed:', adminError)
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403 
        }
      )
    }

    // Parse the request body as JSON
    const requestBody = await req.json();
    const { action } = requestBody || { action: '' };

    // Create a Supabase client with service role key for admin operations
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
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
        // Restrict dangerous SQL operations
        const { query, params } = requestBody;
        
        if (!query) {
          throw new Error('Query is required')
        }
        
        // Basic SQL injection protection - block dangerous operations
        const dangerousOperations = ['DROP', 'TRUNCATE', 'DELETE FROM auth.', 'UPDATE auth.', 'ALTER SYSTEM', 'CREATE USER', 'DROP USER'];
        const upperQuery = query.toUpperCase();
        
        for (const op of dangerousOperations) {
          if (upperQuery.includes(op)) {
            throw new Error(`Dangerous operation detected: ${op}`)
          }
        }
        
        // Execute the query with admin privileges but restricted scope
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

    // Log admin action for audit trail
    console.log(`Admin action performed by ${session.user.email}: ${action}`)

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
