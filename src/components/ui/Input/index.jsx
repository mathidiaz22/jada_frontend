import { twMerge } from "tailwind-merge";

export const Input = ({
  className,
  name = "",
  type,
  placeholder,
  value,
  id = "",
  onChange,
  onKeyUp = () => {},
}) => {
  return (
    <input
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      onKeyUp={(e) => onKeyUp(e.key)}
      className={twMerge(
        className,
        "w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white/5 backdrop-blur-sm"
      )}
      placeholder={placeholder}
    />
  );
};
