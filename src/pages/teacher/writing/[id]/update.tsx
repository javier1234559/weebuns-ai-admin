import WritingLessonView from "@/feature/lesson/writing/views/WritingLessonView";
import { useParams } from "react-router-dom";

export default function UpdateWritingLessonPage() {
  const { id } = useParams();
  return <WritingLessonView isEdit lessonId={id} />;
}
