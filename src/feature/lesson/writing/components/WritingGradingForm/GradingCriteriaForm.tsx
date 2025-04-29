import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="9"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-16 text-center"
                  />
                </FormControl>
                <div className="w-full bg-gray-200 dark:bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(field.value / 9) * 100}%` }}
                  />
                </div>
              </div>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
