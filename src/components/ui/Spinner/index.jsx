import ScaleLoader from "react-spinners/ScaleLoader";

export const Spinner = ({ color = "#fff" }) => {
  return (
    <ScaleLoader
      color={color}
      loading={true}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
