import { twMerge } from "tailwind-merge";

export const CheckBox = ({ id = "", className, checked, onChange }) => {
  return (
    <input
      id={id}
      onChange={() => onChange(!checked)}
      type="checkbox"
      checked={checked}
      className={twMerge(
        className,
        "h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
      )}
    />
  );
};
