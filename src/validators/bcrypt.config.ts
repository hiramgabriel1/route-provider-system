import bcrypt from "bcrypt";

export const encryptPasswordSecurity = async (password: string) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  } catch (error) {
    console.error(error);
  }
};

export const verifyPasswordSecurity = async (
  password: string,
  hashPassword: string
) => {
  try {
    const verify = await bcrypt.compare(password, hashPassword);

    return verify;
  } catch (error) {
    console.error(error);
  }
};
