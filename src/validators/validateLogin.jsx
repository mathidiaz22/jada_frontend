import validator from "validator";
import { message } from "../utils/toast";

export const validateLoginInput = ({ email, password }) => {
  if (validator.isEmpty(email)) {
    message({ type: "error", content: "Email field is required" });
    return;
  }

  if (!validator.isEmail(email)) {
    message({ type: "error", content: "Email is invalid" });
    return;
  }

  if (validator.isEmpty(password)) {
    message({ type: "error", content: "Password field is required" });
    return;
  }

  return true;
};
