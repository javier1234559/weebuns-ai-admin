import { useFormContext } from "react-hook-form";
import { Question } from "@/feature/lesson/quiz/schema";
import { ListeningTest } from "@/feature/lesson/listening/components/ListeningTest";

const PreviewTab = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  // Transform the form values to match ReadingTest props
  const listeningTestProps = {
    title: formValues.title || "",
    description: formValues.description || "",
    audioUrl: formValues.content?.audio_url || "",
    questions: formValues.content.questions.map((question: Question) => ({
      id: question.id || String(Math.random()),
      question: question.question,
      options: question.answer_list.map((option) => option.answer),
      answer: question.right_answer,
    })),
  };

  return (
    <div className="w-full">
      <ListeningTest {...listeningTestProps} />
    </div>
  );
};

export default PreviewTab;
