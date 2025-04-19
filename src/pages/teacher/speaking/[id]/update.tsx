import SpeakingLessonView from "@/feature/lesson/speaking/views/SpeakingLessonView";
import { useParams } from "react-router-dom";

export default function UpdateSpeakingLessonPage() {
  const { id } = useParams();
  return <SpeakingLessonView isEdit lessonId={id} />;
}
