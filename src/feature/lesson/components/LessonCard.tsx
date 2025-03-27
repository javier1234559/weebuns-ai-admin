import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  BookOpen,
  CheckIcon,
  ClipboardIcon,
  Clock,
  Edit2,
  Eye,
  Share,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import * as React from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Lesson } from "@/services/swagger-types";

export interface LessonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  lesson: Lesson;
  onEdit?: (lesson: Lesson) => void;
  onView?: (lesson: Lesson) => void;
}

export function LessonCard(props: LessonCardProps) {
  const { className, lesson, onEdit, onView, ...prop } = props;
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

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
      case "deleted":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Map lesson level to a more readable format
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

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-md border shadow-sm transition-all duration-200 ease-in-out hover:shadow",
        className,
      )}
      {...prop}
    >
      <div
        className={cn(
          "relative flex items-center justify-between gap-2 border-b bg-card p-2 text-card-foreground",
        )}
      >
        <div className="flex items-center gap-1.5 text-xs">
          <Badge
            className={cn("capitalize text-xs", getSkillColor(lesson.skill))}
          >
            {lesson.skill}
          </Badge>
        </div>
        <Badge
          className={cn("capitalize text-xs", getStatusColor(lesson.status))}
        >
          {lesson.status}
        </Badge>
      </div>
      <div className="flex-grow [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
        <Card className="h-full">
          <CardHeader className="space-y-1 p-3 pb-0">
            <CardTitle className="line-clamp-1 text-sm font-medium">
              {lesson.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-xs">
              {lesson.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative p-3 pt-2">
            <div className="relative">
              <img
                className="aspect-video w-full rounded-md object-cover transition-all hover:scale-[1.02]"
                src={lesson.thumbnailUrl || ""}
                alt={lesson.title}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 p-3 pt-0">
            <div className="flex items-center justify-between w-full text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <BookOpen className="size-3" />
                <span className="capitalize">{formatLevel(lesson.level)}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3" />
                <span>{lesson.timeLimit} min</span>
              </div>
            </div>

            <Separator className="my-1" />

            <div className="flex flex-col items-start w-full">
              {lesson.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 w-full items-start">
                  {lesson.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="capitalize text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="text-xs text-muted-foreground">
                {format(new Date(lesson.updatedAt), "MMM dd, yyyy")}
              </div>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => {
                        navigator.clipboard.writeText(lesson.title);
                        setHasCopied(true);
                        toast.success("Copied lesson title!");
                      }}
                    >
                      <span className="sr-only">Copy</span>
                      {hasCopied ? (
                        <CheckIcon className="size-3" />
                      ) : (
                        <ClipboardIcon className="size-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Copy Title</TooltipContent>
                </Tooltip>

                {onView && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => onView(lesson)}
                      >
                        <span className="sr-only">View</span>
                        <Eye className="size-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">View</TooltipContent>
                  </Tooltip>
                )}

                {onEdit && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => onEdit(lesson)}
                      >
                        <span className="sr-only">Edit</span>
                        <Edit2 className="size-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Edit</TooltipContent>
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
