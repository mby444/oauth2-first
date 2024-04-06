import fbUser from "../model/fb-user.js";

export const saveFBUser = async (data) => {
  await fbUser.create(data);
};

export const getFBUser = async (email) => {
  const userData = await fbUser.findOne({ email });
  return userData;
};

export const updateFBUser = async (email, data) => {
  await fbUser.updateOne({ email }, data);
};
