
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId, enableAll, moduleIds } = await req.json()
    
    // Validate input
    if (!userId || !Array.isArray(moduleIds)) {
      return new Response(
        JSON.stringify({ error: 'Invalid input parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Toggle modules request: userId=${userId}, enableAll=${enableAll}, moduleIds=`, moduleIds)

    if (enableAll) {
      // First delete existing modules to avoid duplicates
      const { error: deleteError } = await supabase
        .from('user_modules')
        .delete()
        .eq('user_id', userId)
      
      if (deleteError) {
        console.error("Error deleting existing modules:", deleteError)
        throw deleteError
      }
      
      console.log(`Deleted existing modules for user ${userId}`)
      
      // Then add all modules
      if (moduleIds.length > 0) {
        const modulesToInsert = moduleIds.map(moduleId => ({
          user_id: userId,
          module_id: moduleId
        }))
        
        console.log(`Inserting ${modulesToInsert.length} modules for user ${userId}:`, modulesToInsert)
        
        const { error } = await supabase
          .from('user_modules')
          .insert(modulesToInsert)
        
        if (error) {
          console.error("Error inserting modules:", error)
          throw error
        }
        
        console.log(`Successfully inserted modules for user ${userId}`)
      }
    } else {
      // Remove all modules
      const { error } = await supabase
        .from('user_modules')
        .delete()
        .eq('user_id', userId)
      
      if (error) {
        console.error("Error removing all modules:", error)
        throw error
      }
      
      console.log(`Removed all modules for user ${userId}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred during processing' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
