import { twMerge } from "tailwind-merge";

export const Label = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(className, "text-sm font-medium text-gray-700")}
    >
      {children}
    </label>
  );
};
