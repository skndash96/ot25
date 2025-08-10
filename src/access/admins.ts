import { Admin, User } from "@/payload-types";
import { FieldAccessArgs } from "node_modules/payload/dist/fields/config/types";
import { Access, AccessArgs } from "payload";

export const admins = (args: AccessArgs) => {
  if (args.req.user && args.req.user.collection === 'admins') {
    return true;
  }

  return false;
}