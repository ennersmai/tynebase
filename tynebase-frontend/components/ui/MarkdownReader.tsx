"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownReader({ content }: { content: string }) {
  const slugCounts = new Map<string, number>();

  const toSlug = (input: string) =>
    input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const plainText = (children: React.ReactNode): string => {
    if (typeof children === "string") return children;
    if (typeof children === "number") return String(children);
    if (Array.isArray(children)) return children.map((c) => plainText(c)).join("");
    if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
      return plainText(children.props.children);
    }
    return "";
  };

  const getHeadingId = (children: React.ReactNode) => {
    const text = plainText(children);
    const base = toSlug(text);
    if (!base) return undefined;
    const next = (slugCounts.get(base) ?? 0) + 1;
    slugCounts.set(base, next);
    return next === 1 ? base : `${base}-${next}`;
  };

  return (
    <div className="rounded-2xl border border-[var(--dash-border-subtle)] bg-[var(--surface-card)] overflow-hidden">
      <div className="px-6 py-5 border-b border-[var(--dash-border-subtle)] bg-[var(--surface-ground)]">
        <p className="text-sm font-semibold text-[var(--dash-text-primary)]">Document</p>
        <p className="text-xs text-[var(--dash-text-tertiary)] mt-1">
          Markdown preview with GitHub-flavored support.
        </p>
      </div>

      <div className="px-6 py-6">
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1
                  id={getHeadingId(children)}
                  className="text-3xl font-bold text-[var(--dash-text-primary)] mt-0 mb-4 scroll-mt-24"
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  id={getHeadingId(children)}
                  className="text-2xl font-bold text-[var(--dash-text-primary)] mt-8 mb-3 scroll-mt-24"
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  id={getHeadingId(children)}
                  className="text-xl font-semibold text-[var(--dash-text-primary)] mt-6 mb-2 scroll-mt-24"
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-[15px] leading-7 text-[var(--dash-text-secondary)] mb-4">
                  {children}
                </p>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-[var(--brand)] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 text-[15px] text-[var(--dash-text-secondary)] mb-4 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 text-[15px] text-[var(--dash-text-secondary)] mb-4 space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-7">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[var(--brand)]/40 bg-[var(--brand)]/5 rounded-xl px-4 py-3 my-5 text-[var(--dash-text-secondary)]">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="px-2 py-0.5 rounded-md bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] text-[13px] text-[var(--dash-text-primary)]">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="rounded-xl bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] p-4 overflow-auto mb-5 text-[13px]">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-auto mb-5">
                  <table className="w-full border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[var(--surface-ground)] border-b border-[var(--dash-border-subtle)]">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="text-left text-xs font-semibold text-[var(--dash-text-muted)] px-3 py-2">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="text-sm text-[var(--dash-text-secondary)] px-3 py-2 border-t border-[var(--dash-border-subtle)]">
                  {children}
                </td>
              ),
              hr: () => <hr className="my-6 border-[var(--dash-border-subtle)]" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
