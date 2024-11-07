import { showForbiddenError } from "./ErrorMessages";
import ErrorToast from "./ErrorToast";
import { setIsSessionExpired } from "../Redux/Slices/NavigationSlice";
import { setLoading } from "../Redux/Slices/ArticleGenerationSlice";

// import { useDispatch, useSelector } from 'react-redux';




export const HandleForbiddenGenericErrors = (error, dispatch) => {

    // const dispatch = useDispatch()


    if (error.response.status && error.response.status === 403) {
        console.log('we are going to login *********************')

        setTimeout(() => {

            dispatch(setIsSessionExpired(true))
            showForbiddenError()


        }, 1000);

        return;
    }


    if (error.response) {
        setTimeout(() => {

            ErrorToast(error.response.data?.error || 'Something went wrong');

        }, 1000);
    } else {
        // In case of a network error or if no response is available
        ErrorToast('Network error or server is unreachable');
    }

}