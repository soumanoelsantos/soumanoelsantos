
-- Create a function to lookup seller by access token
-- This function runs with SECURITY DEFINER to bypass RLS policies
CREATE OR REPLACE FUNCTION public.get_seller_by_token(token_param text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    seller_record record;
    result json;
BEGIN
    -- Log the function call
    RAISE LOG 'get_seller_by_token called with token: %', left(token_param, 10) || '...';
    
    -- Find the seller by access token
    SELECT * INTO seller_record
    FROM public.sellers 
    WHERE access_token = token_param
    LIMIT 1;
    
    -- Check if seller was found
    IF seller_record IS NULL THEN
        RAISE LOG 'No seller found with token: %', left(token_param, 10) || '...';
        RETURN NULL;
    END IF;
    
    -- Log success
    RAISE LOG 'Seller found: % (ID: %)', seller_record.name, seller_record.id;
    
    -- Convert record to JSON
    result := row_to_json(seller_record);
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in get_seller_by_token: %', SQLERRM;
        RETURN NULL;
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.get_seller_by_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_seller_by_token(text) TO authenticated;
