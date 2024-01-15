import bcrypt from "bcrypt";

export const encryptPasswordSecurity = async (password: string) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  } catch (error) {
    console.error(error);
  }
};

export async function verifyPasswordSecurity(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    throw error; 
  }
}
