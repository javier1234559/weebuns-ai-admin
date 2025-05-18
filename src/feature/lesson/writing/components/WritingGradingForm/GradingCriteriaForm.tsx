import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";

export function GradingCriteriaForm() {
  const form = useFormContext<WritingGradingFormValues>();
  const criteria = [
    { name: "overall_score", label: "Overall Score" },
    { name: "task_response", label: "Task Response" },
    { name: "coherence_cohesion", label: "Coherence & Cohesion" },
    { name: "lexical_resource", label: "Lexical Resource" },
    { name: "grammar", label: "Grammar" },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {criteria.map(({ name, label }) => (
        <FormField
          key={name}
          control={form.control}
          name={`gradingCriteria.${name}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={9}
                    step={1}
                    value={[field.value ?? 0]}
                    onValueChange={([value]) => field.onChange(value)}
                    className="w-full"
                  />
                  <div className="w-10 text-right font-medium">
                    {field.value ?? 0}
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
