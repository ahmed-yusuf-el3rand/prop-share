import client from "../client";

export const getMoneyApi = ({ signal }) => client.get("/money", { signal });
