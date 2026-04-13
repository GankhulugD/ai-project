"use client";

import { useState, useRef } from "react";
import { RotateCw, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { ResultText } from "@/components/ResultText";

export const ImageAnalysisContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
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
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <TabsContent
      value="image-analysis"
      className="mt-8 space-y-8 animate-in fade-in duration-500"
    >
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Vector.svg" alt="v" />
            <h2 className="text-2xl font-bold">Image analysis</h2>
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
          Upload a food photo, and AI will detect the ingredients.
        </p>

        <div className="relative flex-1">
          <Input
            ref={inputRef}
            id="picture"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={loading}
            className="border-slate-300 rounded-lg text-sm pl-3 pr-20 h-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            JPG, PNG
          </span>
        </div>

        {preview && (
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-56 object-cover"
            />
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleGenerate}
            disabled={loading || !file}
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
          <h3 className="text-xl font-bold">Here is the summary</h3>
        </div>

        <Card className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-5 text-[14px] leading-relaxed text-slate-600">
            {!result && !error && !loading && (
              <p className="text-slate-400 italic text-center py-2">
                Upload an image to recognize ingredients.
              </p>
            )}
            {loading && (
              <div className="flex items-center justify-center gap-2 py-4 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Vision model is analyzing your image...</span>
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
