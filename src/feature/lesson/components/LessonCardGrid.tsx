import { Lesson } from "@/feature/lesson/types/lesson";
import { LessonCard } from "@/feature/lesson/components/LessonCard";

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
  if (lessons.length === 0) {
    return (
      <div className="col-span-full py-8 text-center">
        <p className="text-sm text-muted-foreground">
          No lessons found matching your criteria.
        </p>
      </div>
    );
  }

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
