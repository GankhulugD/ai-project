import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const enhancedPrompt = `Professional food photography of ${prompt}, beautifully plated, restaurant quality, soft natural lighting, high resolution, appetizing`;

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: enhancedPrompt }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("HF Image gen error:", err);
      return NextResponse.json(
        { error: "Image generation failed." },
        { status: 500 },
      );
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({ image: `data:image/jpeg;base64,${base64}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
