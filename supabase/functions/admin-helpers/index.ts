
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

    // Get the session of the authenticated user
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    // If no session or not an admin, return 401
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Não autorizado' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    // Check if the user is an admin
    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    if (profileError || !profileData.is_admin) {
      return new Response(
        JSON.stringify({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    // Parse the request body as JSON
    const { action } = await req.json()

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

    let result
    
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
            
        result = profiles
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
