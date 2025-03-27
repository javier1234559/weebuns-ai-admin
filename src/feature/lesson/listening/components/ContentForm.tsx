import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadAudio from "@/components/feature/UploadAudio";

const ContentForm = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listening Audio</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the listening audio that students will listen to and answer
          questions about
        </p>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="content.audio_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Audio File</FormLabel>
              <FormControl>
                <UploadAudio value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ContentForm;
