import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import { axiosInstance } from "@/api";

import { voiceMapper } from "../libs/voiceMapper";

export const useGetVoices = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["voices"],
    queryFn: () => axiosInstance.get("/heygen-voices").then((res) => res.data),
    select: (res) => voiceMapper(get(res, "data", [])),
  });

  return { isLoading, data, error };
};
