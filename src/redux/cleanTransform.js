import { createTransform } from "redux-persist";

export const cleanTransform = createTransform(
  // inbound (save to storage)
  (inboundState) => {
    return inboundState; // ❌ kuch bhi strip mat karo
  },
  // outbound (load from storage)
  (outboundState) => {
    return outboundState; // ❌ pura state wapas do
  },
  { whitelist: ["user"] }
);
