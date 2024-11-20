import { twMerge } from "tailwind-merge";

export const Button = ({ children, className, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className={twMerge(
        className,
        "flex items-center justify-center py-3 px-4 rounded-lg"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
