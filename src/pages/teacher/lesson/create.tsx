import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lesson } from "@/feature/lesson/types/lesson";
import { Plus, Search, Filter } from "lucide-react";

import { mockIELTSLessons, IELTS_SKILLS } from "@/feature/lesson/data";
import { LessonCardGrid } from "@/feature/lesson/components/LessonCardGrid";
import { LessonCardList } from "@/feature/lesson/components/LessonCardList";
import { useNavigate } from "react-router-dom";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";

export default function LessonManagementPage() {
  const navigate = useNavigate();
  const [activeSkill, setActiveSkill] = useState<string>("reading");
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleViewLesson = (lesson: Lesson) => {
    const routeName = replaceRouteName(RouteNames.TeacherLessonReadingDetail, {
      id: lesson.id,
    });
    navigate(routeName);
  };

  const handleEditLesson = (lesson: Lesson) => {
    const routeName = replaceRouteName(RouteNames.TeacherLessonReadingEdit, {
      id: lesson.id,
    });
    navigate(routeName);
  };

  const handleCreateLesson = (skill: string) => {
    switch (skill) {
      case "reading":
        navigate(`${RouteNames.TeacherLessonReadingCreate}`);
        break;
      // case "writing":
      //   navigate(`${RouteNames.TeacherLessonWritingCreate}`);
      //   break;
      // case "listening":
      //   navigate(`${RouteNames.TeacherLessonListeningCreate}`);
      //   break;
      default:
        break;
    }
  };

  const filteredLessons = mockIELTSLessons.filter((lesson) => {
    const matchesSearch =
      searchTerm === "" ||
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSkill = lesson.skill === activeSkill;

    const matchesLevel =
      levelFilter === "all" || lesson.level.toLowerCase() === levelFilter;

    const matchesStatus =
      statusFilter === "all" || lesson.status === statusFilter;

    return matchesSearch && matchesSkill && matchesLevel && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Lesson Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage your IELTS lesson content
            </p>
          </div>
        </div>

        <Tabs
          value={activeSkill}
          onValueChange={setActiveSkill}
          className="w-full"
        >
          <TabsList className="mb-6 grid grid-cols-4">
            {IELTS_SKILLS.map((skill) => (
              <TabsTrigger key={skill} value={skill} className="capitalize">
                {skill}
              </TabsTrigger>
            ))}
          </TabsList>

          {IELTS_SKILLS.map((skill) => (
            <TabsContent key={skill} value={skill} className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                <h2 className="text-xl font-semibold tracking-tight capitalize">
                  {skill} Lessons
                </h2>
                <Button
                  size="sm"
                  className="gap-1 h-9"
                  onClick={() => handleCreateLesson(skill)}
                >
                  <Plus className="size-4" />
                  <span>New {skill} Lesson</span>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lessons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-10 text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="h-10 text-sm w-[130px]">
                      <Filter className="mr-1 h-3.5 w-3.5" />
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-10 text-sm w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full mt-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredLessons.length} lessons
                  </p>
                  <Tabs
                    value={viewMode}
                    onValueChange={(v) => setViewMode(v as "grid" | "list")}
                    className="w-auto"
                  >
                    <TabsList className="h-9">
                      <TabsTrigger value="grid" className="text-xs px-3">
                        Grid
                      </TabsTrigger>
                      <TabsTrigger value="list" className="text-xs px-3">
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {viewMode === "grid" ? (
                  <LessonCardGrid
                    lessons={filteredLessons}
                    onView={handleViewLesson}
                    onEdit={handleEditLesson}
                  />
                ) : (
                  <LessonCardList
                    lessons={filteredLessons}
                    onView={handleViewLesson}
                    onEdit={handleEditLesson}
                  />
                )}

                {filteredLessons.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
                    <h3 className="mb-2 text-lg font-medium">
                      No lessons found
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground max-w-md">
                      {searchTerm ||
                      levelFilter !== "all" ||
                      statusFilter !== "all"
                        ? "Try adjusting your filters to find what you're looking for."
                        : `You haven't created any ${skill} lessons yet.`}
                    </p>
                    <Button onClick={() => handleCreateLesson(skill)}>
                      <Plus className="mr-2 size-4" />
                      Create your first {skill} lesson
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
