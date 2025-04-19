import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface QuestionItemProps {
  questionIndex: number;
  onRemoveQuestion: (index: number) => void;
  canRemove: boolean;
  onAddOption: (index: number) => void;
  onRemoveOption: (index: number, optionIndex: number) => void;
}

const QuestionItem = ({
  questionIndex,
  onRemoveQuestion,
  canRemove,
  onAddOption,
  onRemoveOption,
}: QuestionItemProps) => {
  const { control, watch } = useFormContext();

  const answer_list = watch(`content.questions.${questionIndex}.answer_list`);
  const canRemoveOption = answer_list?.length > 2;

  return (
    <Card>
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">
            Question {questionIndex + 1}
          </CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemoveQuestion(questionIndex)}
            disabled={!canRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name={`content.questions.${questionIndex}.question`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your question"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <FormLabel>Answer Options</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAddOption(questionIndex)}
            >
              <Plus className="mr-2 h-3 w-3" />
              Add Option
            </Button>
          </div>

          {answer_list.map(
            (_option: { answer: string }, optionIndex: number) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <FormField
                  control={control}
                  name={`content.questions.${questionIndex}.answer_list.${optionIndex}.answer`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-muted text-xs font-medium">
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          <Input
                            placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveOption(questionIndex, optionIndex)}
                  disabled={!canRemoveOption}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ),
          )}
        </div>

        <FormField
          control={control}
          name={`content.questions.${questionIndex}.right_answer`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answer</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {answer_list.map(
                    (option: { answer: string }, optionIndex: number) => {
                      const trimmedOption = option.answer?.trim();
                      if (!trimmedOption) return null;

                      return (
                        <SelectItem key={optionIndex} value={trimmedOption}>
                          {`${String.fromCharCode(65 + optionIndex)}: ${
                            trimmedOption.length > 30
                              ? trimmedOption.substring(0, 30) + "..."
                              : trimmedOption
                          }`}
                        </SelectItem>
                      );
                    },
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Select which option is the correct answer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default QuestionItem;
