
// DeepSeek API client for making API calls

/**
 * Call the DeepSeek API with prepared prompt
 */
export const callDeepseekApi = async (prompt: string) => {
  try {
    const apiKey = "sk-92fe5ce2bc9b4ff2bb125ec8edf6b684";
    const endpoint = "https://api.deepseek.com/v1/chat/completions";
    
    console.log("Calling DeepSeek API with prompt:", prompt);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a business strategy expert that specializes in creating practical, actionable SWOT strategy recommendations. Focus on specific, concrete actions a business can take immediately."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("DeepSeek API error:", errorData);
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("DeepSeek API response:", data);
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    return null;
  }
};
