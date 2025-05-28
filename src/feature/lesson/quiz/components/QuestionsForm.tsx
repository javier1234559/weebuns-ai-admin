import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import QuestionItem from "./QuestionItem";
import { Question } from "@/feature/lesson/quiz/schema";

const QuestionsForm = () => {
  const { setValue, getValues, watch } = useFormContext();

  const questions = watch("content.questions");
  const canRemoveQuestion = questions?.length > 1;

  const handleAddQuestion = useCallback(() => {
    const currentQuestions = getValues("content.questions");
    console.log(currentQuestions);
    setValue("content.questions", [
      ...currentQuestions,
      {
        id: uuidv4(),
        question: "",
        right_answer: "",
        answer_list: [{ answer: "" }, { answer: "" }],
        is_bookmark: false,
        selected_answer: undefined,
      },
    ]);
  }, [getValues, setValue]);

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      const currentQuestions = getValues("content.questions");
      if (currentQuestions.length > 1) {
        setValue(
          "content.questions",
          currentQuestions.filter(
            (_question: Question, i: number) => i !== index,
          ),
        );
      }
    },
    [getValues, setValue],
  );

  const handleAddOption = useCallback(
    (questionIndex: number) => {
      const currentQuestions = getValues("content.questions");
      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex].answer_list.push({ answer: "" });
      setValue("content.questions", updatedQuestions);
    },
    [getValues, setValue],
  );

  const handleRemoveOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      const currentQuestions = getValues("content.questions");
      if (currentQuestions[questionIndex].answer_list.length > 2) {
        const updatedQuestions = [...currentQuestions];
        const removedOption =
          updatedQuestions[questionIndex].answer_list[optionIndex].answer;
        updatedQuestions[questionIndex].answer_list.splice(optionIndex, 1);

        // Nếu option bị xóa là đáp án đúng, reset đáp án
        if (updatedQuestions[questionIndex].right_answer === removedOption) {
          updatedQuestions[questionIndex].right_answer = "";
        }

        setValue("content.questions", updatedQuestions);
      }
    },
    [getValues, setValue],
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Câu hỏi</h2>
        <Button type="button" onClick={handleAddQuestion} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Thêm câu hỏi
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
