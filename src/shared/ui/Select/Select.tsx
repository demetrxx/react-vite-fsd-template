import { ChangeEvent, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/func';
import cls from './Select.module.scss';

interface SelectProps {
  className?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  firstDisabled?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const { className, options, onChange, value, defaultValue, firstDisabled } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={classNames(cls.wrapper, [className])}>
      <select
        value={value}
        onChange={handleChange}
        defaultValue={defaultValue}
        className={cls.select}
      >
        {options.map((option, idx) => (
          <option disabled={idx === 0 && firstDisabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});
