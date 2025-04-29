import WritingGradingWritingView from "@/feature/lesson/writing/views/WritingGradingWritingView";
import { useParams } from "react-router-dom";

export default function WritingGradingUpdatePage() {
  const { submissionId } = useParams();
  return <WritingGradingWritingView submissionId={submissionId} />;
}
