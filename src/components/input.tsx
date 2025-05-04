import { InputHTMLAttributes } from "react";

type InputaProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputaProps) => {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
