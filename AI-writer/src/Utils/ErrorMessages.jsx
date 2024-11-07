import ErrorToast from "./ErrorToast";


export const showGenericError = () => {
    ErrorToast('Oops! Something went wrong. Please try again.');
};

export const showForbiddenError = () =>{
    ErrorToast('Your session expired, please log in')
}




