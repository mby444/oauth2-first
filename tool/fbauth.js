import axios from "axios";

export const getFBUserData = async (accessToken) => {
  const { data } = await axios({
    url: "https://graph.facebook.com/me",
    method: "get",
    params: {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: accessToken,
    },
  });
  return data;
};
