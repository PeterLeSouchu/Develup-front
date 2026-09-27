import { LuSearch, LuX } from 'react-icons/lu';
import { TechnologieType } from '../../../types';

interface TechnoPickerProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: TechnologieType[];
  onCloseSuggestions: () => void;
  onAdd: (tech: TechnologieType) => void;
  selected: TechnologieType[];
  onDelete: (tech: TechnologieType) => void;
  inputId: string;
}

// Presentational only: state and handlers stay in the parent component
function TechnoPicker({
  inputValue,
  onInputChange,
  suggestions,
  onCloseSuggestions,
  onAdd,
  selected,
  onDelete,
  inputId,
}: TechnoPickerProps) {
  return (
    <div>
      <div className="relative">
        <LuSearch
          aria-hidden
          className="dv-muted pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        />
        <input
          id={inputId}
          onChange={onInputChange}
          value={inputValue}
          type="text"
          autoComplete="off"
          placeholder="Rechercher une techno"
          className="dv-input pl-10"
        />
        {suggestions.length > 0 && (
          <>
            <div
              aria-label="close suggest techno"
              onKeyDown={onCloseSuggestions}
              role="button"
              tabIndex={0}
              className="fixed inset-0 z-20 cursor-default"
              onClick={onCloseSuggestions}
            />
            <div className="absolute left-0 top-full z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-line bg-white2 p-1.5 shadow-xl dark:border-night-line dark:bg-night-surface">
              {suggestions.map((suggestion) => (
                <button
                  onClick={() => onAdd(suggestion)}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl p-1.5 text-left transition hover:bg-paper dark:hover:bg-night-line"
                  key={suggestion.id}
                >
                  <img
                    src={suggestion.image}
                    alt=""
                    className="h-9 w-9 rounded-lg border border-line bg-white2 object-contain p-1 dark:border-night-line"
                  />
                  {suggestion.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {selected.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {selected.map((tech) => (
            <li key={tech.id} className="dv-chip pr-1">
              <img src={tech.image} alt="" className="dv-chip-logo" />
              {tech.name}
              <button
                onClick={() => onDelete(tech)}
                type="button"
                aria-label={`Retirer ${tech.name}`}
                className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-paper dark:hover:bg-night-line"
              >
                <LuX className="text-xs" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TechnoPicker;
