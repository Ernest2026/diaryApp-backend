import bcrypt from "bcrypt";

export const getEncryptedPassword = async (key: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(key, salt);

  return hashedPassword;
};

export const getDecryptedPassword = async (
  oldPwd: string,
  newPwd: string,
): Promise<boolean> => {
  const decryptedPassword = await bcrypt.compare(
    oldPwd,
    newPwd
  );

  return decryptedPassword;
};
