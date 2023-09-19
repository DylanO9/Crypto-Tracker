import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove the user from local storage
        localStorage.removeItem('user');

        // update the context
        dispatch({ type: 'LOGOUT' });
    }

    return {logout}
};