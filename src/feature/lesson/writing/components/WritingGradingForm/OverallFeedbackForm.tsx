import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";

export function OverallFeedbackForm() {
  const form = useFormContext<WritingGradingFormValues>();

  return (
    <FormField
      control={form.control}
      name="overallFeedback"
      render={({ field }) => (
        <FormItem className="min-h-[300px]">
          <FormLabel>Overall Feedback</FormLabel>
          <FormControl>
            <TipTapEditor {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
