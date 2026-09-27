import { InputHTMLAttributes } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

interface PasswordFieldProps {
  id: string;
  label: string;
  type: string;
  onToggle: () => void;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

// Works with react-hook-form register() spread or controlled value/onChange
function PasswordField({
  id,
  label,
  type,
  onToggle,
  inputProps,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="dv-label" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="dv-input pr-12"
          type={type}
          id={id}
          placeholder="••••••••"
          {...inputProps}
        />
        <button
          type="button"
          aria-label={
            type === 'password'
              ? 'Afficher le mot de passe'
              : 'Masquer le mot de passe'
          }
          onClick={onToggle}
          className="dv-muted absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg hover:bg-paper hover:text-ink dark:hover:bg-night-line dark:hover:text-paper"
        >
          {type === 'password' ? <LuEye /> : <LuEyeOff />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
