import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/services/servicesCrud";
import type { AddUserType } from "@/types/typesCrud";

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ( user: AddUserType ) => addUser( user ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    });
};

