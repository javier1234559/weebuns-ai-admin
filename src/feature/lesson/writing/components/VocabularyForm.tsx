import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { WritingLessonFormValues } from "../schema";
import UploadImage from "@/components/feature/UploadImage";

function VocabularyForm() {
  const { control } = useFormContext<WritingLessonFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content.vocabulary_list",
  });

  const addVocabularyItem = () => {
    append({
      term: "",
      meaning: [""],
      example_sentence: "",
      image_url: "",
      reference_link: "",
      reference_name: "",
      tags: [],
      repetition_level: 0,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vocabulary List</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVocabularyItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Vocabulary
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No vocabulary items added yet. Click the button above to add one.
          </div>
        ) : (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Vocabulary Item {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <FormField
                  control={control}
                  name={`content.vocabulary_list.${index}.term`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter vocabulary term" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`content.vocabulary_list.${index}.meaning`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meanings</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter meanings (one per line)"
                          value={field.value?.join("\n") || ""}
                          onChange={(e) => {
                            const meanings = e.target.value
                              .split("\n")
                              .filter((m) => m.trim() !== "");
                            field.onChange(meanings);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`content.vocabulary_list.${index}.example_sentence`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Example Sentence</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter example sentence"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`content.vocabulary_list.${index}.image_url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <UploadImage
                            value={field.value || null}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`content.vocabulary_list.${index}.reference_link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter reference link"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name={`content.vocabulary_list.${index}.reference_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter reference name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`content.vocabulary_list.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter tags (comma separated)"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => {
                            const tags = e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter((tag) => tag !== "");
                            field.onChange(tags);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default VocabularyForm;
