import TipTapEditor from "@/components/feature/editor/TipTapEditor";
import { FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDescription } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function ResourceForm() {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Analysis Guide */}
        <FormField
          control={control}
          name="content.resources.analysis_guide"
          render={({ field }) => (
            <FormItem>
              <Label>Analysis Guide</Label>
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

        <Separator />

        {/* Sample Essay */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sample Essay (Optional)</h3>

          <FormField
            control={control}
            name="content.resources.sample_essay.instruction"
            render={({ field }) => (
              <FormItem>
                <Label>Instruction</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content.resources.sample_essay.body1"
            render={({ field }) => (
              <FormItem>
                <Label>Body Paragraph 1</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content.resources.sample_essay.body2"
            render={({ field }) => (
              <FormItem>
                <Label>Body Paragraph 2</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content.resources.sample_essay.conclusion"
            render={({ field }) => (
              <FormItem>
                <Label>Conclusion</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ResourceForm;
