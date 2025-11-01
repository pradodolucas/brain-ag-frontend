/** @jsxImportSource @emotion/react */

"use client";

import * as stylesBase from "../shared/styles";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
}

export function InputText({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required,
  register,
  error,
  ...rest
}: InputTextProps) {

  return (
    <div css={stylesBase.input.container}>
      {label && <label css={stylesBase.input.label}>{label}</label>}
      <input
        css={stylesBase.input.base}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...register}
        {...rest}
      />

      {error && <span css={stylesBase.input.error.text}>{error}</span>}
    </div>
  );
}
