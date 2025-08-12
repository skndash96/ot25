import { AccessArgs } from "payload";

export const admins = (args: AccessArgs) => {
  if (args.req.user && args.req.user.collection === 'admins') {
    return true;
  }

  return false;
}