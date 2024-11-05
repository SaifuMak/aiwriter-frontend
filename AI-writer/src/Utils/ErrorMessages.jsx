import ErrorToast from "./ErrorToast";


export const showGenericError = () => {
    ErrorToast('Oops! Something went wrong. Please try again.');
};

export const showForbiddenError = () =>{
    ErrorToast('Your session is over, please log in')
}




