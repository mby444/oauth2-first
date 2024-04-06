import user from "../model/user.js";

export const saveUser = async (data) => {
  await user.create(data);
};

export const getUser = async (email) => {
  const userData = await user.findOne({ email });
  return userData;
};

export const updateUser = async (email, data) => {
  await user.updateOne({ email }, data);
};
