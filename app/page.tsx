"use client";

import { Tabs } from "@/components/ui/tabs";
import { TabsButtons } from "@/components/TabsButtons";
import { ImageAnalysisContent } from "@/components/ImageAnalysisContent";
import { IngredientContent } from "@/components/IngredientContent";
import { ImageCreatorContent } from "@/components/ImageCreatorContent";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <main className="flex flex-1 w-full max-w-xl items-center justify-center py-32 p-2 bg-white ">
        <Tabs defaultValue="image-analysis" className="w-full">
          <TabsButtons />
          <ImageAnalysisContent />
          <IngredientContent />
          <ImageCreatorContent />
        </Tabs>
      </main>
    </div>
  );
}
