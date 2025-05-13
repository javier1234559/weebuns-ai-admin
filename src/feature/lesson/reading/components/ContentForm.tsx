import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";

const ContentForm = () => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading Passage</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the reading text that students will read and answer questions
          about
        </p>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="content.text"
          render={({ field }) => (
            <FormItem>
              <FormControl className="h-full">
                <TipTapEditor {...field} />
              </FormControl>
              <FormDescription>
                HTML formatting can be used for paragraphs, headings, and other
                text elements
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ContentForm;
