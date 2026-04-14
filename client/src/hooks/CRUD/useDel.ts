import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DelUserType } from '../../types/typesCrud';
import { delUser } from '@/services/servicesCrud';

export const useDelUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ( user: DelUserType ) => delUser( user ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
};