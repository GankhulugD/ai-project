"use client";

import { useState } from "react";
import { RotateCw, ImageIcon, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

export const ImageCreatorContent = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setImage(data.image);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setImage(null);
    setError(null);
  };

  const handleDownload = () => {
    if (!image) return;
    const a = document.createElement("a");
    a.href = image;
    a.download = "generated-food.jpg";
    a.click();
  };

  return (
    <TabsContent
      value="image-creator"
      className="mt-8 space-y-8 animate-in fade-in duration-500"
    >
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Vector.svg" alt="v" />
            <h2 className="text-2xl font-bold">Food image creator</h2>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="rounded-full bg-slate-100 border-slate-200"
          >
            <RotateCw className="w-5 h-5 text-slate-600" />
          </Button>
        </div>

        <p className="text-slate-600 text-sm">
          What food image do you want? Describe it briefly.
        </p>

        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="e.g. A steaming bowl of tonkotsu ramen..."
          className="border-slate-300 rounded-lg text-sm h-10"
          disabled={loading}
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="bg-[#a1a1aa] hover:bg-[#71717a] text-white rounded-lg px-6 h-10 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-t border-slate-100 pt-8">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-7 h-7 text-black-900" />
            <h3 className="text-xl font-bold">Result</h3>
          </div>
          {image && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-1 text-slate-600 rounded-lg"
            >
              <Download className="w-4 h-4" /> Save
            </Button>
          )}
        </div>

        <Card className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-5">
            {!image && !error && !loading && (
              <p className="text-slate-400 italic text-center text-[14px] py-2">
                Enter a description to generate a food image.
              </p>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm">
                  FLUX.1 is generating your image...
                </span>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {image && (
              <img
                src={image}
                alt="Generated food"
                className="w-full rounded-xl object-cover"
              />
            )}
          </CardContent>
        </Card>
      </section>
    </TabsContent>
  );
};
