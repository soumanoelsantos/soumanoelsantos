
// DeepSeek API client for making API calls

/**
 * Call the DeepSeek API with prepared prompt
 */
export const callDeepseekApi = async (prompt: string) => {
  try {
    const apiKey = "sk-1d594453b40d47cca214e46aa8e8a9ae";
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
            content: "You are a skilled software developer and coding assistant. Help users create functional, well-commented code in various programming languages. Provide clear explanations and practical examples."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
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
