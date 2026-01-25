"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { DashboardPageHeader } from "@/components/layout/DashboardPageHeader";
import { ArrowLeft, Plus, Send, Tag } from "lucide-react";

const categories = [
  { id: "announcements", label: "Announcements", color: "#ef4444" },
  { id: "questions", label: "Questions", color: "#3b82f6" },
  { id: "ideas", label: "Ideas & Feedback", color: "#8b5cf6" },
  { id: "general", label: "General Discussion", color: "#10b981" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

export default function NewDiscussionPage() {
  const [category, setCategory] = useState<CategoryId>("general");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === category),
    [category]
  );

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="min-h-full flex flex-col gap-8">
      <DashboardPageHeader
        left={
          <Button variant="ghost" size="md" className="px-3" asChild>
            <Link href="/dashboard/community">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        }
        title={<h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">New Discussion</h1>}
        description={
          <p className="text-[var(--dash-text-tertiary)]">
            Start a thread for your team. Ask a question, share an update, or collect feedback.
          </p>
        }
        right={
          <Button variant="primary" size="lg" className="gap-2 px-7" disabled={!isValid}>
            <Send className="w-5 h-5" />
            Post
          </Button>
        }
      />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 sm:p-8 space-y-7">
              <div>
                <div className="text-sm font-medium text-[var(--dash-text-secondary)] mb-2">Category</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const active = cat.id === category;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={
                          "flex items-center gap-2 rounded-lg text-sm font-medium transition-colors px-4 py-2.5 " +
                          (active
                            ? "text-white shadow-sm"
                            : "bg-[var(--surface-ground)] text-[var(--dash-text-secondary)] hover:bg-[var(--surface-hover)]")
                        }
                        style={active ? { backgroundColor: cat.color } : undefined}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: active ? "rgba(255,255,255,0.9)" : cat.color }}
                        />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                className="h-12 px-4"
              />

              <Textarea
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, add context, and include any links or snippets your team might need."
                rows={10}
                className="px-4 py-3 bg-[var(--surface-card)]"
              />

              <Input
                label="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. webhooks, integrations, best-practices"
                className="h-12 px-4"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold text-[var(--dash-text-primary)] mb-2">Posting tips</div>
              <div className="text-sm text-[var(--dash-text-tertiary)] space-y-2">
                <div>Use a descriptive title so others can find it later.</div>
                <div>Include steps, expected behavior, and what you already tried.</div>
                <div>Add tags to help with search and filtering.</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="font-semibold text-[var(--dash-text-primary)] mb-3">Selected category</div>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--dash-text-secondary)] truncate">
                    {selectedCategory?.label ?? ""}
                  </div>
                  <div className="text-xs text-[var(--dash-text-muted)] mt-1">
                    Choose where your thread belongs.
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${selectedCategory?.color ?? "#999"}15`, color: selectedCategory?.color ?? "#999" }}
                >
                  <Tag className="w-3.5 h-3.5" />
                  {category}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" size="lg" className="w-full px-6" asChild>
            <Link href="/dashboard/community">
              <Plus className="w-5 h-5" />
              Browse discussions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
