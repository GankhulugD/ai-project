import { ImageIcon, RotateCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

export const ImageCreatorContent = () => {
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
            className="rounded-full bg-slate-100 border-slate-200"
          >
            <RotateCw className="w-5 h-5 text-slate-600" />
          </Button>
        </div>

        <p className="text-slate-600 text-sm">
          What food image do you want? Describe it briefly.
        </p>

        <div className="flex items-center gap-4 w-full">
          <div className="relative flex-1">
            <Input
              id="text"
              type="text"
              className="border-slate-300 rounded-lg text-sm pl-3 pr-20 h-10"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button className="bg-[#a1a1aa] hover:bg-[#71717a] text-white rounded-lg px-6 h-10 transition-colors">
            Generate
          </Button>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-3 border-t border-slate-100 pt-8">
          <FileText className="w-7 h-7 text-blue-900" />
          <h3 className="text-xl font-bold">Result</h3>
        </div>

        <Card className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold">
              First, enter your text to generate an image.
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[14px] leading-relaxed text-slate-600">
            {/* <p>
                      <b>Vegetables:</b> Red cabbage, Broccolini, Bok choy.
                    </p>
                    <p>
                      <b>Proteins:</b> Salmon fillet, Eggs.
                    </p>
                    <p>
                      <b>Fruits:</b> Avocado, Apples.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-400 italic text-[14px] text-center">
                        First, enter your image to recognize an ingredients.
                      </p>
                    </div> */}
          </CardContent>
        </Card>
      </section>
    </TabsContent>
  );
};
