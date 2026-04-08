import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, TextSelectionIcon } from "lucide-react";

export const TabsButtons = () => {
  return (
    <TabsList className="w-full h-auto flex bg-slate-100 rounded-lg p-1 gap-2">
      <TabsTrigger
        value="image-analysis"
        className="rounded-md p-3 data-[state=active]:bg-white data-[state=active]:text-slate-900 flex gap-2 justify-center items-center"
      >
        <ImageIcon className="w-4 h-4" />
        Image analysis
      </TabsTrigger>
      <TabsTrigger
        value="ingredient-recognition"
        className="rounded-md p-3 flex gap-2 justify-center items-center text-slate-600 data-[state=active]:text-slate-900"
      >
        <TextSelectionIcon className="w-4 h-4" />
        Ingredient recognition
      </TabsTrigger>
      <TabsTrigger
        value="image-creator"
        className="rounded-md p-3 flex gap-2 justify-center items-center text-slate-600 data-[state=active]:text-slate-900"
      >
        <ImageIcon className="w-4 h-4" />
        Image creator
      </TabsTrigger>
    </TabsList>
  );
};
