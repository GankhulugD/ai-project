import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "moonshotai/Kimi-K2.5:fireworks-ai",
          messages: [
            {
              role: "system",
              content:
                "You are a culinary expert. Extract all ingredients from the given food description. Return a clean structured list grouped by category such as Vegetables, Proteins, Fruits, Dairy, Grains, Spices & Seasonings, Sauces & Condiments. Only include what is clearly mentioned or strongly implied. Be concise.",
            },
            {
              role: "user",
              content: `Extract all ingredients from this food description:\n\n"${text}"`,
            },
          ],
          max_tokens: 600,
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("HF API error:", err);
      return NextResponse.json(
        { error: "Model request failed." },
        { status: 500 },
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content ?? "No result returned.";
    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
