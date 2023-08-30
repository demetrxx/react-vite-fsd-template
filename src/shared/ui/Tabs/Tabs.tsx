import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/func';
import cls from './Tabs.module.scss';

export interface TabItem {
  key: string;
  label: string;
  children: ReactNode;
}
interface TabsProps {
  className?: string;
  headerClassName?: string;
  defaultActive?: string;
  items: TabItem[];
  onChange?: (key: string) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, headerClassName, defaultActive, items, onChange } = props;
  const [active, setActive] = useState<string>(defaultActive || items[0].key);

  const handleChange = useCallback(
    (key: string) => {
      setActive(key);
      onChange?.(key);
    },
    [onChange]
  );

  const itemsMap = useMemo(
    () =>
      items.reduce<Record<string, TabItem>>((acc, i) => {
        acc[i.key] = i;
        return acc;
      }, {}),
    [items]
  );

  const labels = useMemo(
    () =>
      items.map((i) => (
        <li key={i.key}>
          <button
            className={classNames(cls.label, [], { [cls.activeLabel]: i.key === active })}
            type="button"
            onClick={() => handleChange(i.key)}
          >
            {i.label}
          </button>
        </li>
      )),
    [items, active, handleChange]
  );

  return (
    <div className={classNames(cls.tabs, [className])}>
      <ul className={classNames(cls.header, [headerClassName])}>{labels}</ul>
      {itemsMap[active].children}
    </div>
  );
});
