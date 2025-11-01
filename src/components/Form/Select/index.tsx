/** @jsxImportSource @emotion/react */

"use client";

import { forwardRef } from "react";

import * as styles from "./styles";
import * as stylesBase from "../shared/styles";

import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      disabled,
      required,
      register,
      error,
      options,
      ...rest
    },
    ref
  ) => {
    return (
      <div css={stylesBase.input.container}>
        {label && <label css={stylesBase.input.label}>{label}</label>}
        <select
          css={styles.select}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          ref={ref}
          {...register}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <span css={stylesBase.input.error.text}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";