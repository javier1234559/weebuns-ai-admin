import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WritingGradingFormValues, Correction } from "./schema";
import { Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const ERROR_TYPES = [
  { value: "grammar", label: "Ngữ pháp" },
  { value: "vocabulary", label: "Từ vựng / Dùng từ" },
  { value: "punctuation", label: "Dấu câu" },
  { value: "spelling", label: "Chính tả" },
  { value: "cohesion", label: "Liên kết và mạch lạc" },
  { value: "sentence_structure", label: "Cấu trúc câu" },
  { value: "tone", label: "Giọng điệu / Mức độ trang trọng" },
  { value: "other", label: "Khác" },
] as const;

interface FeedbackCorrectionsFormProps {
  selectedText: { text: string; position: number } | null;
  onAddCorrection: (correction: Omit<Correction, "id">) => void;
  onEditCorrection: (id: string, correction: Partial<Correction>) => void;
  onDeleteCorrection: (id: string) => void;
  onFocusCorrection?: (id: string) => void;
  focusedCorrectionId?: string;
}

export function FeedbackCorrectionsForm({
  selectedText,
  onAddCorrection,
  onEditCorrection,
  onDeleteCorrection,
  onFocusCorrection,
  focusedCorrectionId,
}: FeedbackCorrectionsFormProps) {
  const form = useFormContext<WritingGradingFormValues>();
  const corrections = form.watch("corrections");
  const [editingCorrectionId, setEditingCorrectionId] = useState<string | null>(null);

  const [newCorrection, setNewCorrection] = useState({
    error: "grammar",
    suggestion: "The correct version of the text",
    reason: "The text is grammatically incorrect",
  });

  const handleAddCorrection = () => {
    if (selectedText) {
      onAddCorrection({
        ...newCorrection,
        sentence: selectedText.text,
        position: selectedText.position,
      });
      setNewCorrection({
        error: "grammar",
        suggestion: "The correct version of the text",
        reason: "The text is grammatically incorrect",
      });
    }
  };

  const handleEditCorrection = (correction: Correction) => {
    setEditingCorrectionId(correction.id);
    setNewCorrection({
      error: correction.error,
      suggestion: correction.suggestion,
      reason: correction.reason,
    });
  };

  const handleSaveEdit = () => {
    if (editingCorrectionId) {
      onEditCorrection(editingCorrectionId, {
        error: newCorrection.error,
        suggestion: newCorrection.suggestion,
        reason: newCorrection.reason,
      });
      setEditingCorrectionId(null);
      setNewCorrection({
        error: "grammar",
        suggestion: "The correct version of the text",
        reason: "The text is grammatically incorrect",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCorrectionId(null);
    setNewCorrection({
      error: "grammar",
      suggestion: "The correct version of the text",
      reason: "The text is grammatically incorrect",
    });
  };

  return (
    <div className="space-y-4">
      {(selectedText || editingCorrectionId) && (
        <div className="border border-primary/30 bg-primary/5 p-3 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium text-sm text-primary">
              {editingCorrectionId ? "Edit Correction" : "Selected Text:"}
            </p>
            {editingCorrectionId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="space-y-2 mt-1">
            <div className="correction-original">
              <p className="text-xs mb-1 font-medium">Original:</p>
              <p className="text-sm line-through italic">
                "{editingCorrectionId ? corrections.find(c => c.id === editingCorrectionId)?.sentence : selectedText?.text}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-3">
            <div>
              <label className="text-xs font-medium">Error Type</label>
              <Select
                value={newCorrection.error}
                onValueChange={(value) =>
                  setNewCorrection({ ...newCorrection, error: value })
                }
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select error type" />
                </SelectTrigger>
                <SelectContent>
                  {ERROR_TYPES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium">
                Suggested Correction
              </label>
              <Input
                value={newCorrection.suggestion}
                onChange={(e) =>
                  setNewCorrection({
                    ...newCorrection,
                    suggestion: e.target.value,
                  })
                }
                placeholder="Corrected version of the text"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Reason</label>
              <Input
                value={newCorrection.reason}
                onChange={(e) =>
                  setNewCorrection({ ...newCorrection, reason: e.target.value })
                }
                placeholder="Explanation for the correction"
                className="mt-1"
              />
            </div>

            <Button
              onClick={editingCorrectionId ? handleSaveEdit : handleAddCorrection}
              className="w-full"
            >
              {editingCorrectionId ? "Save Changes" : "Add Correction"}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto thin-scrollbar">
        {corrections.map((correction) => (
          <div
            key={correction.id}
            className={`correction-card ${focusedCorrectionId === correction.id ? "focused" : ""}`}
            onClick={() => onFocusCorrection?.(correction.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium text-sm">{correction.error}</span>
              <div className="space-x-1">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCorrection(correction);
                  }}
                  variant="ghost"
                  size="sm"
                  type="button"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCorrection(correction.id);
                  }}
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <div className="correction-original">
                <p className="text-xs mb-1 font-medium">Original:</p>
                <p className="text-sm italic line-through">
                  "{correction.sentence}"
                </p>
              </div>
              <div className="correction-suggestion">
                <p className="text-xs mb-1 font-medium">Correction:</p>
                <p className="text-sm font-medium">"{correction.suggestion}"</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Reason:</span> {correction.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
