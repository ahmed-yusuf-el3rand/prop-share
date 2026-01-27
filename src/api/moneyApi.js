import client from "./client";

export const getMoneyApi = () => client.get("/money");
