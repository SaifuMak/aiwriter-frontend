import { showForbiddenError } from "./ErrorMessages";
import ErrorToast from "./ErrorToast";

export const HandleForbiddenError = (error) => {

    if (error.response.status && error.response.status === 403) {
        setTimeout(() => {

            showForbiddenError()

        }, 500);
        return;
    }
    
    
    if (error.response) {
        setTimeout(() => {
            ErrorToast(error.response.data?.error || 'Something went wrong');
        }, 500);
    } else {
        // In case of a network error or if no response is available
        ErrorToast('Network error or server is unreachable');
    }

}