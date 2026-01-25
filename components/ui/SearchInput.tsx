"use client";

import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  showClear?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 text-sm leading-[1.2] pl-8 pr-8",
  md: "h-10 text-sm leading-[1.2] pl-10 pr-10",
  lg: "h-12 text-base leading-[1.2] pl-12 pr-12",
};

const iconSizeClasses = {
  sm: "w-4 h-4 left-2",
  md: "w-4 h-4 left-3",
  lg: "w-5 h-5 left-4",
};

const clearSizeClasses = {
  sm: "w-4 h-4 right-2",
  md: "w-4 h-4 right-3",
  lg: "w-5 h-5 right-4",
};

export function SearchInput({
  value,
  onChange,
  onSearch,
  isLoading = false,
  showClear = true,
  inputSize = "md",
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const size = inputSize;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
    if (e.key === "Escape") {
      onChange("");
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]",
          iconSizeClasses[size]
        )}
      >
        {isLoading ? (
          <Loader2 className="w-full h-full animate-spin" />
        ) : (
          <Search className="w-full h-full" />
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full box-border bg-[var(--surface-ground)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors",
          "focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20",
          sizeClasses[size]
        )}
        {...props}
      />
      {showClear && value && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors",
            clearSizeClasses[size]
          )}
        >
          <X className="w-full h-full" />
        </button>
      )}
    </div>
  );
}

interface SearchWithSuggestionsProps extends SearchInputProps {
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  recentSearches?: string[];
}

export function SearchWithSuggestions({
  suggestions = [],
  onSuggestionSelect,
  recentSearches = [],
  ...props
}: SearchWithSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (suggestion: string) => {
    props.onChange(suggestion);
    onSuggestionSelect?.(suggestion);
    setShowSuggestions(false);
  };

  const displaySuggestions = props.value ? suggestions : recentSearches;

  return (
    <div ref={containerRef} className="relative">
      <SearchInput
        {...props}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && displaySuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg shadow-lg py-1 max-h-60 overflow-auto">
          {!props.value && recentSearches.length > 0 && (
            <p className="px-3 py-1.5 text-xs font-medium text-[var(--text-tertiary)]">Recent</p>
          )}
          {displaySuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-ground)] text-left"
            >
              <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
