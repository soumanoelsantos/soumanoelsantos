
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

    // Get the current user session
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    // Parse the request body as JSON
    const requestBody = await req.json()
    const { userId } = requestBody

    // Validate userId
    if (!userId) {
      throw new Error('User ID is required')
    }

    // Create a Supabase client with service role key to bypass RLS
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}` },
        },
      }
    )

    console.log("Edge function: Fetching profile for user:", userId)
    
    // Use service role to fetch user profile (bypasses RLS)
    const { data: profile, error } = await adminClient
      .from('profiles')
      .select('is_admin, is_new_user, email')
      .eq('id', userId)
      .single()

    if (error) {
      console.error("Error fetching profile:", error)
      throw error
    }

    if (!profile) {
      console.log("No profile found for user:", userId)
      // Return a default profile structure
      return new Response(
        JSON.stringify({ 
          id: userId, 
          is_admin: false, 
          is_new_user: true,
          email: null
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    console.log("Profile found:", profile)
    
    // Return the user profile with userId
    return new Response(
      JSON.stringify({ 
        id: userId,
        is_admin: profile.is_admin,
        is_new_user: profile.is_new_user,
        email: profile.email 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in get-user-profile edge function:', error)
    
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
