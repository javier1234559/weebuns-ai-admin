import { useParams } from "react-router-dom";

export default function EditReadingLessonPage() {
  const { id } = useParams();
  return <div>EditReadingLessonPage {id}</div>;
}
