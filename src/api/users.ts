import axios from "./axios";
import { User } from "../types";

export const getUsers = async (
  page: number,
  limit: number,
): Promise<{ data: User[]; total: number }> => {
  const response = await axios.get(`/users?page=${page}&limit=${limit}`);
  return response.data;
};

export const updateUserRole = async (
  id: string,
  role: string,
): Promise<User> => {
  const response = await axios.patch(`/users/${id}/role`, { role });
  return response.data;
};
