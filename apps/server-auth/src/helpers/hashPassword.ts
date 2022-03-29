import { hashSync } from "bcrypt";

export const hashPassword = (password: string) => hashSync(password, 12);
