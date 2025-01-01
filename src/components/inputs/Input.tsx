"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder=""
        className={`peer p-4 pt-6 w-full bg-white font-light rounded-md outline-none border-2 transition disabled:cursor-not-allowed disabled:opacity-70 ${
          errors[id]
            ? "border-rose-400 focus:border-rose-400"
            : "border-slate-300 focus:border-slate-300"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute top-6 left-4 cursor-text text-md duration-150 z-10 origin-[0] transform -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-500" : "text-slate-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
