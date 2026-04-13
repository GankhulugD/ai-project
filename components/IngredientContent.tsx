"use client";

import { useState } from "react";
import { RotateCw, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { ResultText } from "@/components/ResultText";

export const IngredientContent = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setError(null);
  };

  return (
    <TabsContent
      value="ingredient-recognition"
      className="mt-8 space-y-8 animate-in fade-in duration-500"
    >
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Vector.svg" alt="v" />
            <h2 className="text-2xl font-bold">Ingredient recognition</h2>
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
          Describe the food, and AI will detect the ingredients.
        </p>

        <div className="flex items-center gap-4 w-full">
          <Input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g. A bowl of spicy ramen with pork belly..."
            className="border-slate-300 rounded-lg text-sm h-10"
            disabled={loading}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleGenerate}
            disabled={loading || !text.trim()}
            className="bg-[#a1a1aa] hover:bg-[#71717a] text-white rounded-lg px-6 h-10 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
              </span>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-3 border-t border-slate-100 pt-8">
          <FileText className="w-7 h-7 text-black-900" />
          <h3 className="text-xl font-bold">Identified Ingredients</h3>
        </div>

        <Card className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-5 text-[14px] leading-relaxed text-slate-600">
            {!result && !error && !loading && (
              <p className="text-slate-400 italic text-center py-2">
                Enter your text to recognize ingredients.
              </p>
            )}
            {loading && (
              <div className="flex items-center justify-center gap-2 py-4 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Kimi-K2.5 is analyzing...</span>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && <ResultText text={result} />}
          </CardContent>
        </Card>
      </section>
    </TabsContent>
  );
};
