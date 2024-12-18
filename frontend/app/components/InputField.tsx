import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label htmlFor={name} className="text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...inputProps}
      />
      {error?.message && (
        <span className="text-xs text-red-500 font-medium">
          {error.message.toString()}
        </span>
      )}
    </div>
  );
}
