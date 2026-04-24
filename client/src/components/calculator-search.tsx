import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { findCalculatorsByKeywords, type Calculator } from "@shared/calculator-registry";

interface CalculatorSearchProps {
  compact?: boolean;
  onNavigate?: () => void;
  placeholder?: string;
  className?: string;
}

export default function CalculatorSearch({
  compact = false,
  onNavigate,
  placeholder = "Zoek een calculator...",
  className = "",
}: CalculatorSearchProps) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ calculator: Calculator; score: number }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(!compact);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((text: string) => {
    if (text.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const matches = findCalculatorsByKeywords(text, 8);
    setResults(matches);
    setIsOpen(matches.length > 0 || text.trim().length >= 2);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, handleSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (compact) {
          setExpanded(false);
          setQuery("");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [compact]);

  const navigateTo = (url: string) => {
    setLocation(url);
    setQuery("");
    setIsOpen(false);
    setResults([]);
    if (compact) {
      setExpanded(false);
    }
    onNavigate?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      navigateTo(results[activeIndex].calculator.url);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      if (compact) {
        setExpanded(false);
        setQuery("");
      }
      inputRef.current?.blur();
    }
  };

  if (compact && !expanded) {
    return (
      <button
        onClick={() => {
          setExpanded(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 ${className}`}
        aria-label="Zoeken"
      >
        <Search className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pl-9 pr-8 py-2 text-sm bg-accent/30 border border-border/50 rounded-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 ${
            compact ? "w-48" : ""
          }`}
          aria-label="Zoek een calculator"
          aria-expanded={isOpen}
          aria-controls="search-results"
          role="combobox"
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zoekopdracht wissen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id="search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/50 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={result.calculator.slug}
                  id={`search-result-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => navigateTo(result.calculator.url)}
                  className={`w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors border-b border-border/30 last:border-b-0 ${
                    index === activeIndex ? "bg-accent/50" : ""
                  }`}
                >
                  <div className="font-medium text-sm text-foreground">
                    {result.calculator.title}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {result.calculator.description}
                  </div>
                  <div className="text-xs text-primary/70 mt-0.5">
                    {result.calculator.category}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Geen resultaten gevonden
            </div>
          )}
        </div>
      )}
    </div>
  );
}
