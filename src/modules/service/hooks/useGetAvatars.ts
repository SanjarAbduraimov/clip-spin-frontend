import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import { axiosInstance } from "@/api";

import { avatarMapper } from "../libs/avatarMapper";

export const useGetAvatars = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["avatars"],
    queryFn: () => axiosInstance.get("/heygen-avatars").then((res) => res.data),
    select: (res) => avatarMapper(get(res, "data", [])),
  });

  return { isLoading, data, error };
};
