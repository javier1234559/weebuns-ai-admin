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

import { mockIELTSLessons } from "@/feature/lesson/data";
import { LessonCardGrid } from "@/feature/lesson/components/LessonCardGrid";
import { LessonCardList } from "@/feature/lesson/components/LessonCardList";

export default function LessonPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleViewLesson = (lesson: Lesson) => {
    console.log("Viewing lesson:", lesson);
  };

  const handleEditLesson = (lesson: Lesson) => {
    console.log("Editing lesson:", lesson);
  };

  const handleCreateLesson = () => {
    console.log("Creating new lesson");
  };

  const filteredLessons = mockIELTSLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesSkill =
      skillFilter === "all" || lesson.skill.toLowerCase() === skillFilter;

    const matchesLevel =
      levelFilter === "all" || lesson.level.toLowerCase() === levelFilter;

    const matchesStatus =
      statusFilter === "all" || lesson.status === statusFilter;

    return matchesSearch && matchesSkill && matchesLevel && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="space-y-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              IELTS Lessons
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage and organize your IELTS lesson content
            </p>
          </div>
          <Button size="sm" className="gap-1 h-8" onClick={handleCreateLesson}>
            <Plus className="size-3.5" />
            <span>New Lesson</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="h-8 text-xs w-[110px]">
                <Filter className="mr-1 h-3 w-3" />
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="speaking">Speaking</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="listening">Listening</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-8 text-xs w-[110px]">
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
              <SelectTrigger className="h-8 text-xs w-[110px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground">
            Showing {filteredLessons.length} lessons
          </p>
          <TabsList className="h-8">
            <TabsTrigger value="grid" className="text-xs px-3">
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="text-xs px-3">
              List
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="w-full mt-0">
          <LessonCardGrid
            lessons={filteredLessons}
            onView={handleViewLesson}
            onEdit={handleEditLesson}
          />
        </TabsContent>

        <TabsContent value="list" className="w-full mt-0">
          <LessonCardList
            lessons={filteredLessons}
            onView={handleViewLesson}
            onEdit={handleEditLesson}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
