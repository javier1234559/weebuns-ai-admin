import { SubmissionStatus, WritingSubmission } from "@/services/swagger-types";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Highlighter, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValues,
  writingGradingFormSchema,
  WritingGradingFormValues,
} from "./schema";
import { GradingCriteriaForm } from "./GradingCriteriaForm";
import { ContentGradingForm } from "./ContentGradingForm";
import { FeedbackCorrectionsForm } from "./FeedbackCorrectionsForm";
import { OverallFeedbackForm } from "./OverallFeedbackForm";
import { Form } from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";
import CancelGradingButton from "../CancelGradingButton";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/constraints/route-name";

interface WritingGradingFormProps {
  initialData?: WritingSubmission;
  onSubmit: (data: WritingGradingFormValues) => void;
  isLoading: boolean;
}

export default function WritingGradingForm({
  initialData,
  onSubmit,
  isLoading,
}: WritingGradingFormProps) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedText, setSelectedText] = useState<{
    text: string;
    position: number;
  } | null>(null);
  const [focusedCorrectionId, setFocusedCorrectionId] = useState<string>();
  const navigate = useNavigate();
  const form = useForm<WritingGradingFormValues>({
    resolver: zodResolver(writingGradingFormSchema),
    defaultValues: {
      content: {
        user_data: {
          instruction:
            initialData?.content?.user_data?.instruction ||
            defaultValues.content.user_data.instruction,
          body1:
            initialData?.content?.user_data?.body1 ||
            defaultValues.content.user_data.body1,
          body2:
            initialData?.content?.user_data?.body2 ||
            defaultValues.content.user_data.body2,
          conclusion:
            initialData?.content?.user_data?.conclusion ||
            defaultValues.content.user_data.conclusion,
        },
        lesson_id:
          initialData?.content?.lesson_id || defaultValues.content.lesson_id,
        chat_history:
          initialData?.content?.chat_history ||
          defaultValues.content.chat_history,
      },
      gradingCriteria: {
        overall_score:
          initialData?.feedback?.overall_score ||
          defaultValues.gradingCriteria.overall_score,
        task_response:
          initialData?.feedback?.task_response ||
          defaultValues.gradingCriteria.task_response,
        coherence_cohesion:
          initialData?.feedback?.coherence_cohesion ||
          defaultValues.gradingCriteria.coherence_cohesion,
        lexical_resource:
          initialData?.feedback?.lexical_resource ||
          defaultValues.gradingCriteria.lexical_resource,
        grammar:
          initialData?.feedback?.grammar ||
          defaultValues.gradingCriteria.grammar,
      },
      corrections:
        initialData?.feedback?.corrections.map((c) => ({
          ...c,
          position: Number(c.position),
        })) || defaultValues.corrections,
      overallFeedback:
        initialData?.feedback?.overall_feedback ||
        defaultValues.overallFeedback,
    },
  });

  const handleAddCorrection = (
    correction: Omit<WritingGradingFormValues["corrections"][0], "id">,
  ) => {
    const corrections = form.getValues("corrections");
    form.setValue("corrections", [
      ...corrections,
      { ...correction, id: uuidv4() },
    ]);
    setSelectedText(null);
  };

  const handleEditCorrection = (
    id: string,
    correction: Partial<WritingGradingFormValues["corrections"][0]>,
  ) => {
    const corrections = form.getValues("corrections");
    form.setValue(
      "corrections",
      corrections.map((c) => (c.id === id ? { ...c, ...correction } : c)),
    );
  };

  const handleDeleteCorrection = (id: string) => {
    const corrections = form.getValues("corrections");
    form.setValue(
      "corrections",
      corrections.filter((c) => c.id !== id),
    );
  };

  const handleSubmit = (data: WritingGradingFormValues) => {
    onSubmit({
      ...initialData,
      ...data,
    });
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-full"
        >
          <div className="flex justify-end p-4 gap-2 items-center">
            {initialData?.status === SubmissionStatus.Taken && !isLoading && (
              <CancelGradingButton
                submissionId={initialData.id}
                onClick={() => {
                  navigate(RouteNames.TeacherWritingGrading);
                }}
              />
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </Button>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4 p-4">
            {/* Left side - Essay and scored criteria */}
            <div className="w-full md:w-3/5 space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Bài viết của học viên</CardTitle>
                    <Button
                      type="button"
                      disabled={isLoading}
                      variant={selectionMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectionMode(!selectionMode)}
                      className={cn(
                        "gap-2",
                        selectionMode && "bg-primary text-primary-foreground",
                      )}
                    >
                      <Highlighter className="h-4 w-4" />
                      {selectionMode
                        ? "Selection Mode On"
                        : "Selection Mode Off"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ContentGradingForm
                    selectionMode={selectionMode}
                    onSelectionChange={setSelectedText}
                    focusedCorrectionId={focusedCorrectionId}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Tiêu chí đánh giá</CardTitle>
                </CardHeader>
                <CardContent>
                  <GradingCriteriaForm />
                </CardContent>
              </Card>
            </div>

            {/* Right side - Corrections and feedback */}
            <div className="w-full md:w-2/5">
              <Card className="shadow-sm h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Ghi chú</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="corrections" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="corrections">
                        Các lỗi câu cần sửa
                      </TabsTrigger>
                      <TabsTrigger value="feedback">Ghi chú chung</TabsTrigger>
                    </TabsList>

                    <TabsContent value="corrections" className="space-y-4">
                      <FeedbackCorrectionsForm
                        selectedText={selectedText}
                        onAddCorrection={handleAddCorrection}
                        onEditCorrection={handleEditCorrection}
                        onDeleteCorrection={handleDeleteCorrection}
                        onFocusCorrection={setFocusedCorrectionId}
                        focusedCorrectionId={focusedCorrectionId}
                      />
                    </TabsContent>

                    <TabsContent value="feedback">
                      <OverallFeedbackForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
