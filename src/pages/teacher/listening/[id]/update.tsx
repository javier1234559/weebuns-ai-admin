import { useParams } from "react-router-dom";
import ListeningLessonView from "@/feature/lesson/listening/views/ListeningLessonView";

export default function UpdateListeningLessonPage() {
  const { id } = useParams();
  return <ListeningLessonView isEdit lessonId={id} />;
}
