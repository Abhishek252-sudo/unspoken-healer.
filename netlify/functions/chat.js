export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0].message) {
      console.error("Unexpected API response:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "⚠️ AI did not send a valid reply." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (error) {
    console.error("Chat API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Error connecting to AI." }),
    };
  }
}
