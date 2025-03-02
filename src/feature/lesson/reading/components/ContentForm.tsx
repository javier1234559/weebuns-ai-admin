import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter the reading passage content here..."
                  className="min-h-[400px] font-sans"
                  {...field}
                />
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
