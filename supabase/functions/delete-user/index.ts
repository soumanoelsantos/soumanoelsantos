
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
    );

    // Get the JWT from the request header
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Get the current user session and verify authentication
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - No valid session' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Verify admin status using the security definer function
    const { data: isAdminResult, error: adminError } = await supabaseClient
      .rpc('current_user_is_admin')

    if (adminError || !isAdminResult) {
      console.error('Admin verification failed:', adminError)
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Get the user ID from the request
    const { user_id } = await req.json();
    
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Prevent admins from deleting themselves
    if (user_id === session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Cannot delete your own account' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Use service role client for admin actions, bypassing permission checks
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Delete user from auth.users
    const { error: deleteError } = await serviceClient.auth.admin.deleteUser(user_id);

    if (deleteError) {
      console.error("Error deleting user:", deleteError);
      return new Response(
        JSON.stringify({ error: `Failed to delete user: ${deleteError.message}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Log the admin action for audit trail
    console.log(`User ${user_id} deleted by admin ${session.user.email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'User deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unknown error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
