import { RequestHandler } from "express";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { messages } = req.body as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      console.error("OpenRouter API key not configured");
      return res
        .status(500)
        .json({ error: "OpenRouter API key not configured" });
    }

    console.log("Sending request to OpenRouter with messages:", messages.length);

    const response = await fetch(
      "https://openrouter.io/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://pinia.example.com",
          "X-Title": "PinIA Chat",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-2-7b-chat:free",
          messages: messages,
          max_tokens: 1024,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(response.status).json(data);
    }

    const assistantMessage =
      data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    console.log("OpenRouter response received:", assistantMessage.substring(0, 50));
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
