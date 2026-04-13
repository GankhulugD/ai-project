import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type || "image/jpeg";

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
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: `data:${mimeType};base64,${base64}` },
                },
                {
                  type: "text",
                  text: "Analyze this food image. Identify the dish, then list all visible ingredients grouped by category (Vegetables, Proteins, Fruits, Spices, Dairy, Grains, etc.). End with a short one-sentence summary.",
                },
              ],
            },
          ],
          max_tokens: 800,
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("HF Vision API error:", err);
      return NextResponse.json(
        { error: "Vision model failed." },
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
