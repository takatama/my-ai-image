import { verifyOrigin } from "../utils/origin";

export function onRequestPost(context) {
  return verifyOrigin(context);
}