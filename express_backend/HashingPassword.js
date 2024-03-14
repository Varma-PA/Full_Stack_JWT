import { hash } from "bcrypt";

const hashIt = async (password) => {
  const hashedString = await hash(password, 10);
  return hashedString;
};

export { hashIt };
