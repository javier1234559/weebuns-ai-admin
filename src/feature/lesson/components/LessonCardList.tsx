import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@/feature/lesson/types/lesson";
import { format } from "date-fns";
import { BookOpen, Clock, Edit2, Eye, Share } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

interface LessonCardListProps {
  lessons: Lesson[];
  onView?: (lesson: Lesson) => void;
  onEdit?: (lesson: Lesson) => void;
}

export function LessonCardList({
  lessons,
  onView,
  onEdit,
}: LessonCardListProps) {
  // Map skill to a theme-compatible color class
  const getSkillColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "writing":
        return "bg-primary/10 text-primary";
      case "speaking":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400";
      case "reading":
        return "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400";
      case "listening":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Map status to theme-compatible color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400";
      case "draft":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400";
      case "archived":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Format level text
  const formatLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "Beginner";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      default:
        return level;
    }
  };

  if (lessons.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            No lessons found matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="divide-y">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="sm:w-24 flex-shrink-0">
              <img
                src={lesson.image_url}
                alt={lesson.title}
                className="h-16 w-full rounded-md object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <Badge
                  className={cn(
                    "capitalize text-xs",
                    getSkillColor(lesson.skill),
                  )}
                >
                  {lesson.skill}
                </Badge>
                <Badge variant="outline" className="capitalize text-xs">
                  {lesson.skill_type}
                </Badge>
                <Badge
                  className={cn(
                    "capitalize text-xs",
                    getStatusColor(lesson.status),
                  )}
                >
                  {lesson.status}
                </Badge>
              </div>

              <h3 className="text-sm font-medium truncate">{lesson.title}</h3>

              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="size-3" />
                  <span className="capitalize">
                    {formatLevel(lesson.level)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>{lesson.time_limit} min</span>
                </div>
                <div>{format(new Date(lesson.updated_at), "MMM dd, yyyy")}</div>
              </div>
            </div>

            <div className="flex items-center gap-1 self-end sm:self-center">
              {onView && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => onView(lesson)}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">View</TooltipContent>
                </Tooltip>
              )}

              {onEdit && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => onEdit(lesson)}
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Edit</TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <span className="sr-only">Share</span>
                    <Share className="size-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="p-0" side="bottom">
                  <div className="p-2">
                    <QRCodeSVG
                      value={`${window.location.origin}/lessons/${lesson.id}`}
                      title={lesson.title}
                      size={120}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="L"
                      marginSize={0}
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
