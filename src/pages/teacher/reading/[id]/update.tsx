import ReadingLessonView from "@/feature/lesson/reading/ReadingLessonView";
import { useParams } from "react-router-dom";

export default function UpdateReadingLessonPage() {
  const { id } = useParams();
  return <ReadingLessonView isEdit lessonId={id} />;
}
