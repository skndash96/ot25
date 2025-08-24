import { AccessArgs } from "payload";

export const noAccess = () => false;

export const admins = (args: AccessArgs) => {
  if (args.req.user && args.req.user.collection === 'admins') {
    return true;
  }

  return false;
}