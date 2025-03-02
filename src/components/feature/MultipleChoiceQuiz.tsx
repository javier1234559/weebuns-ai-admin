import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface MultipleChoiceQuizProps {
  questions: Question[];
  selectedAnswers?: Record<string, string>;
  onAnswerSelect?: (questionId: string, answer: string) => void;
  showCorrectAnswers?: boolean;
  className?: string;
  bookmarkedQuestions?: Set<string>;
  onBookmarkToggle?: (questionId: string) => void;
}

export function MultipleChoiceQuiz({
  questions,
  selectedAnswers = {},
  onAnswerSelect,
  showCorrectAnswers = false,
  className,
  bookmarkedQuestions = new Set(),
  onBookmarkToggle,
}: MultipleChoiceQuizProps) {
  const getOptionStyle = (question: Question, option: string) => {
    if (!showCorrectAnswers) {
      return selectedAnswers[question.id] === option
        ? "border-primary bg-primary/10"
        : "";
    }

    if (option === question.answer) {
      return "border-success bg-success/10 dark:bg-success/20";
    }
    if (selectedAnswers[question.id] === option && option !== question.answer) {
      return "border-destructive bg-destructive/10 dark:bg-destructive/20";
    }
    return "";
  };

  const getRadioStyle = (question: Question, option: string) => {
    if (!showCorrectAnswers) {
      return selectedAnswers[question.id] === option
        ? "border-primary"
        : "border-muted-foreground/30";
    }

    if (option === question.answer) {
      return "border-success";
    }
    if (selectedAnswers[question.id] === option && option !== question.answer) {
      return "border-destructive";
    }
    return "border-muted-foreground/30";
  };

  const getDotStyle = (question: Question, option: string) => {
    if (!showCorrectAnswers) {
      return selectedAnswers[question.id] === option ? "bg-primary" : "";
    }

    if (option === question.answer) {
      return "bg-success";
    }
    if (selectedAnswers[question.id] === option && option !== question.answer) {
      return "bg-destructive";
    }
    return "";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {questions.map((q, index) => (
        <Card
          key={q.id}
          id={`question-${q.id}`}
          className="bg-background shadow-none"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Question {index + 1}: {q.question}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "size-8",
                  bookmarkedQuestions.has(q.id) && "text-yellow-500",
                )}
                onClick={() => onBookmarkToggle?.(q.id)}
              >
                <BookmarkIcon className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {q.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => onAnswerSelect?.(q.id, option)}
                  disabled={showCorrectAnswers}
                  className={cn(
                    "w-full flex items-center space-x-2 rounded-lg border p-3",
                    "hover:bg-muted/50 transition-colors",
                    "disabled:cursor-default",
                    getOptionStyle(q, option),
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border flex items-center justify-center transition-colors",
                      getRadioStyle(q, option),
                    )}
                  >
                    {(selectedAnswers[q.id] === option ||
                      (showCorrectAnswers && option === q.answer)) && (
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors",
                          getDotStyle(q, option),
                        )}
                      />
                    )}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// // Hiển thị câu hỏi bình thường
// <MultipleChoiceQuiz
//   questions={questions}
//   selectedAnswers={selectedAnswers}
//   onAnswerSelect={handleAnswerSelect}
// />

// // Hiển thị kết quả với đáp án đúng/sai
// <MultipleChoiceQuiz
//   questions={questions}
//   selectedAnswers={selectedAnswers}
//   showCorrectAnswers={true}
// />

// // Chỉ hiển thị câu hỏi (readonly)
// <MultipleChoiceQuiz
//   questions={questions}
//   selectedAnswers={{}}
// />
