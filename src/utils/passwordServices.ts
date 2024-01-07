import bycript from 'bcrypt';

interface IHashedPasswordResp {
    hashedPassword: string;
    salt: string;
}

const generateSaltHashUser = async () => {
    return await bycript.genSalt(10);
};

export const hashPassword = async (password: string): Promise<IHashedPasswordResp> => {
  const salt = await generateSaltHashUser();
  const hashPassword = await bycript.hash(password, salt);
  return {
    hashedPassword: hashPassword,
    salt,
  };
};

export const comparePassword = async (password: string, userSalt: string) => {
    return await bycript.compare(password, userSalt);
};