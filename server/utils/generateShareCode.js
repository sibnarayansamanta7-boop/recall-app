import crypto from "crypto";

export function generateShareCode() {
  return (
    "RCL-" +
    crypto
      .randomBytes(4)
      .toString("hex")
      .slice(0, 6)
      .toUpperCase()
  );
}