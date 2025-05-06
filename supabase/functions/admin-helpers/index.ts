
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
            ...profile,
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
        
      default:
        throw new Error('Ação inválida')
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
