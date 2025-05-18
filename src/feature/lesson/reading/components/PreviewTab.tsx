import { useFormContext } from "react-hook-form";
import { ReadingTest } from "@/feature/lesson/reading/components/ReadingTest";
import { Question } from "@/feature/lesson/quiz/schema";

const PreviewTab = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  const readingTestProps = {
    title: formValues.title || "",
    description: formValues.description || "",
    content: formValues.content?.text || "",
    questions: formValues.content.questions.map((question: Question) => ({
      id: question.id || String(Math.random()),
      question: question.question,
      options: question.answer_list.map((option) => option.answer),
      answer: question.right_answer,
    })),
  };

  return (
    <div className="w-full">
      <ReadingTest {...readingTestProps} />
    </div>
  );
};

export default PreviewTab;
