import { useQuery } from "@tanstack/react-query";
import getUsers from "@/services/servicesCrud";

export const useGet = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        staleTime: 1000 * 60 & 5,
        retry: 2
    });
}