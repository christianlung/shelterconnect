import { memo, FC } from 'react';

export interface CheckboxOption {
  label: string;
  value: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  onChange: (value: string, checked: boolean) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = memo(function CheckboxGroup({
  options,
  onChange,
}: CheckboxGroupProps) {
  return (
    <div className={'flex flex-row gap-2 py-2'}>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-primary-500"
            onChange={(e) => onChange(option.value, e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600">{option.label}</span>
        </label>
      ))}
    </div>
  );
});

export default CheckboxGroup;
