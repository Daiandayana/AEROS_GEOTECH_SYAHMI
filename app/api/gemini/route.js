// app/api/gemini/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { messages } = await req.json();
  const url = "https://gemini.googleapis.com/v1/responses:generate";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemini-1",
        prompt: messages.map((m) => `${m.role}: ${m.content}`).join("\n"),
      }),
    });

    const text = await response.text();
    console.log("Raw response:", text);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = JSON.parse(text);
    return NextResponse.json({
      reply: data.output_text || "Gemini response here",
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { reply: "Error connecting to Gemini" },
      { status: 500 },
    );
  }
}
