import { get, post, put, del } from "./api";

export const getUsers = () => get("/crud");
export const postUsers = (data) => post("/crud", data);
export const putUsers = (id, data) => put(`/crud/${id}`, data);
export const deleteUsers = (id) => del(`/crud/${id}`);
