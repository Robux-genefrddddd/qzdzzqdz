import { RequestHandler } from "express";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { messages } = req.body as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages);
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
    console.log("Messages:", JSON.stringify(messages, null, 2));

    const requestBody = {
      model: "allenai/molmo-2-8b:free",
      messages: messages,
      max_tokens: 1024,
    };

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

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
        body: JSON.stringify(requestBody),
      },
    );

    const data = await response.json();
    console.log("OpenRouter response status:", response.status);
    console.log("OpenRouter response data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(response.status).json(data);
    }

    const assistantMessage =
      data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    console.log("OpenRouter response received:", assistantMessage.substring(0, 100));
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
