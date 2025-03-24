import ReadingLessonView from "@/feature/lesson/reading/views/ReadingLessonView";
import { useParams } from "react-router-dom";

export default function UpdateReadingLessonPage() {
  const { id } = useParams();
  return <ReadingLessonView isEdit lessonId={id} />;
}
