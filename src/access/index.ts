import { Access, AccessArgs, FieldAccess, PayloadRequest } from "payload";

export const SUPER_EMAIL = ["dashskndash@gmail.com"]

export const anyone: Access = () => true

export const noAccess : Access | FieldAccess = ({ req }: { req: PayloadRequest }) => {
  if (req.user && req.user.collection === 'admins' && SUPER_EMAIL.includes(req.user.email)) {
    return true
  }

  return false
};

export const admins = (args: AccessArgs) => {
  if (args.req.user && args.req.user.collection === 'admins') {
    return true;
  }

  return false;
}