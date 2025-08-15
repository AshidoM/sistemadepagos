import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  type?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const FormField = ({
  label,
  type = "text",
  id = "",
  placeholder = "",
  error = "",
  value = "",
  onChange = () => {},
  required = false,
  autoComplete = "off",
  icon,
  children,
}: FormFieldProps) => {
  return (
    <div className="w-full space-y-3 bg-transparent">
      <div className="flex justify-between items-center">
        <Label
          htmlFor={id}
          className="text-sm font-medium text-slate-200 flex items-center gap-2"
        >
          {icon && <span className="text-baci-yellow">{icon}</span>}
          {label}
        </Label>
        {error && (
          <span className="text-xs text-red-400 transition-all duration-300 ease-in-out animate-fade-in">
            {error}
          </span>
        )}
      </div>

      <div className="relative">
        {children || (
          <Input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            className={cn(
              "w-full transition-all duration-300 border-0 bg-slate-800/60 backdrop-blur-md",
              "text-white placeholder:text-slate-400 rounded-xl px-4 py-3 h-12",
              "focus:bg-slate-800/80 focus:ring-2 focus:ring-baci-yellow/50 focus:outline-none",
              "hover:bg-slate-800/70",
              error
                ? "ring-2 ring-red-400/50 bg-red-900/20"
                : "ring-1 ring-slate-700/50",
            )}
          />
        )}

        {icon && !children && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
