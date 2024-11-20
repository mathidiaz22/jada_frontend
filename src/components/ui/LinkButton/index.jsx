import { twMerge } from "tailwind-merge";

export const LinkButton = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        className,
        "font-medium text-purple-600 hover:text-purple-500"
      )}
    >
      {children}
    </button>
  );
};
