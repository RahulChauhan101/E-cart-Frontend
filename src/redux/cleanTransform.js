// redux/cleanTransform.js (optional alag file)
import { createTransform } from "redux-persist";

export const cleanTransform = createTransform(
  (inbound) => inbound,
  (outbound) => {
    if (typeof outbound === "string") {
      try {
        return JSON.parse(outbound);
      } catch {
        return outbound;
      }
    }
    return outbound;
  }
);
