import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditUserType } from '../../types/typesCrud';
import { editUser } from '@/services/servicesCrud';

export const useEditUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ( user: EditUserType ) => editUser( user ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
};