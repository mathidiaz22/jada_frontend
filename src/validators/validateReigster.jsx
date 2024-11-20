import validator from "validator";
import { message } from "../utils/toast";

export const validateRegisterInput = ({
  email,
  fullname,
  password,
  confirmPassword,
}) => {
  if (validator.isEmpty(email)) {
    message({ type: "error", content: "Email field is required" });
    return;
  }

  if (!validator.isEmail(email)) {
    message({ type: "error", content: "Email is invalid" });
    return;
  }

  if (validator.isEmpty(fullname)) {
    message({ type: "error", content: "Full Name field is required" });
    return;
  }

  if (validator.isEmpty(password)) {
    message({ type: "error", content: "Password field is required" });
    return;
  }

  if (validator.isEmpty(confirmPassword)) {
    message({ type: "error", content: "Confirm Password field is required" });
    return;
  }

  if (!validator.equals(password, confirmPassword)) {
    message({ type: "error", content: "Password does not match" });
    return;
  }

  return true;
};
