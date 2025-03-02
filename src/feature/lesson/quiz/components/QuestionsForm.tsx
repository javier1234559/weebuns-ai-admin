import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import QuestionItem from "./QuestionItem";
import { Question } from "@/feature/lesson/quiz/schema";

const QuestionsForm = () => {
  const { setValue, getValues, watch } = useFormContext();

  const questions = watch("questions");
  const canRemoveQuestion = questions.length > 1;

  const handleAddQuestion = useCallback(() => {
    const currentQuestions = getValues("questions");
    setValue("questions", [
      ...currentQuestions,
      {
        id: uuidv4(),
        question: "",
        options: ["", ""],
        answer: "",
      },
    ]);
  }, [getValues, setValue]);

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      const currentQuestions = getValues("questions");
      if (currentQuestions.length > 1) {
        setValue(
          "questions",
          currentQuestions.filter(
            (_question: Question, i: number) => i !== index,
          ),
        );
      }
    },
    [getValues, setValue],
  );

  // Handler cho việc thêm option mới cho câu hỏi
  const handleAddOption = useCallback(
    (questionIndex: number) => {
      const currentQuestions = getValues("questions");
      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex].options.push("");
      setValue("questions", updatedQuestions);
    },
    [getValues, setValue],
  );

  // Handler cho việc xóa một option của câu hỏi
  const handleRemoveOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      const currentQuestions = getValues("questions");
      if (currentQuestions[questionIndex].options.length > 2) {
        const updatedQuestions = [...currentQuestions];
        const removedOption =
          updatedQuestions[questionIndex].options[optionIndex];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);

        // Nếu option bị xóa là đáp án đúng, reset đáp án
        if (updatedQuestions[questionIndex].answer === removedOption) {
          updatedQuestions[questionIndex].answer = "";
        }

        setValue("questions", updatedQuestions);
      }
    },
    [getValues, setValue],
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Assessment Questions</h2>
        <Button type="button" onClick={handleAddQuestion} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <div className="space-y-6">
        {questions.map((question: Question, index: number) => (
          <QuestionItem
            key={question.id || index}
            questionIndex={index}
            onRemoveQuestion={handleRemoveQuestion}
            canRemove={canRemoveQuestion}
            onAddOption={handleAddOption}
            onRemoveOption={handleRemoveOption}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsForm;
