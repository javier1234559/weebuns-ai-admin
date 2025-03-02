import { useFormContext } from "react-hook-form";
import { ReadingTest } from "@/feature/lesson/reading/components/ReadingTest";
import { Question } from "@/feature/lesson/quiz/schema";

const PreviewTab = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  // Transform the form values to match ReadingTest props
  const readingTestProps = {
    title: formValues.title || "",
    description: formValues.description || "",
    content: formValues.content || "",
    questions: formValues.questions.map((question: Question) => ({
      id: question.id || String(Math.random()),
      question: question.question,
      options: question.options,
      answer: question.answer,
    })),
  };

  return (
    <div className="w-full">
      <ReadingTest {...readingTestProps} />
    </div>
  );
};

export default PreviewTab;
