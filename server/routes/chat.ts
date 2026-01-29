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
      return res
        .status(500)
        .json({ error: "OpenRouter API key not configured" });
    }

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
          model: "allenai/molmo-2-8b:free",
          messages: messages,
          max_tokens: 1024,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter error:", errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    const assistantMessage =
      data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    res.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
