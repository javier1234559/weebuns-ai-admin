import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { WritingLessonFormValues } from "../schema";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";

function TaskForm() {
  const { control } = useFormContext<WritingLessonFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Writing Task</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="content.task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <TipTapEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content.ai_prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Writing Prompt</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter the AI writing prompt"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default TaskForm;
