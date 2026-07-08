import client from "../client";

const deleteAccountApi = () => client.delete("/auth/delete");
const updateProfileApi = (profileData) => client.put("/auth/profile", profileData);

export { deleteAccountApi, updateProfileApi };
