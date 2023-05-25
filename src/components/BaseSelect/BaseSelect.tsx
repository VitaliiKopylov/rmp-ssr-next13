'use client';

import { VscTriangleDown } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import clsx from 'clsx';
import { FieldError } from 'react-hook-form';
import ErrorField from '@components/ErrorField/ErrorField';

import { useState } from 'react';

import styles from './styles.module.scss';

interface IOption {
  value: string;
  label: string;
}

interface IBaseSelectProps {
  labelText?: string;
  id: string;
  options: IOption[];
  onChange: (selected: string[]) => void;
  selected: string[];
  error?: FieldError;
}

const BaseSelect = ({
  labelText,
  options,
  id,
  onChange,
  selected = [],
  error,
}: IBaseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: IOption) => {
    const index = selected.indexOf(option.value);
    const newValue = [...selected];

    if (index === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(index, 1);
    }
    onChange(newValue);
  };

  return (
    <div className={styles.bSelect}>
      {labelText && <div className="form-label">{labelText}</div>}
      <div
        className={styles.bSelect__header}
        onClick={handleToggle}
        tabIndex={0}
      >
        <div className={styles.bSelect__selected} id={id}>
          {selected.length === 0 ? 'Select Genre' : selected.join(', ')}
        </div>
        <IconContext.Provider
          value={{
            color: 'var(--accent_color)',
            className: clsx(
              styles.bSelect__arrow,
              isOpen && styles.bSelect__arrowRotated
            ),
          }}
        >
          <VscTriangleDown />
        </IconContext.Provider>
      </div>
      {error && <ErrorField error={error} />}
      {isOpen && (
        <div className={styles.bSelect__options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.bSelect__option}
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selected.indexOf(option.value) !== -1}
                readOnly
              />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseSelect;
