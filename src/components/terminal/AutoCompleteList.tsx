interface AutoCompleteListProps {
  suggestions: string[];
  activeIndex: number;
}

export default function AutoCompleteList({
  suggestions,
  activeIndex,
}: AutoCompleteListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div role="listbox" aria-label="補完候補" className="mb-2 text-sm">
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion}
          role="option"
          aria-selected={index === activeIndex}
          className={`px-2 py-1 ${
            index === activeIndex
              ? "bg-phosphor/20 text-phosphor text-glow"
              : "text-phosphorDim"
          }`}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
}
