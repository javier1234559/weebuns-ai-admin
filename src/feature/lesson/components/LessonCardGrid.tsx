import { LessonCard } from "@/feature/lesson/components/LessonCard";
import { Lesson } from "@/services/swagger-types";

interface LessonCardGridProps {
  lessons: Lesson[];
  onView?: (lesson: Lesson) => void;
  onEdit?: (lesson: Lesson) => void;
}

export function LessonCardGrid({
  lessons,
  onView,
  onEdit,
}: LessonCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onView={onView}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
