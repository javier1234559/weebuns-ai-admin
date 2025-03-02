import { useParams } from "react-router-dom";

export default function ReadingLessonPage() {
  const { id } = useParams();
  return <div>ReadingLessonPage {id}</div>;
}
