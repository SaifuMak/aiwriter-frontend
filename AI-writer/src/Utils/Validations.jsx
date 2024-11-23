export const ValidateAccountBillingForm = (formData) => {


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        return 'Please provide a valid email address.';
    }


    const creditFields = [
        'words_count',
        'plaigarism_words',
        'add_on_words_count',
        'add_on_plaigarism_words'
    ];


    for (const field of creditFields) {
        console.log(field, 'this field ')

        if (isNaN(formData[field])) {
            console.log(field, 'this field is not a number')
            return 'Credits should be a valid number.';
        }
    }

    // Validate phone number (must be less than or equal to 16 characters)
    if (formData.phone_number && formData.phone_number.length > 16) {
        return 'Phone number should be less than or equal to 16 characters'
    }

    // Validate zip code (must be less than or equal to 20 characters)
    if (formData.zipCode && formData.zipCode.length > 15) {
        return 'Zip code should be less than or equal to 15 characters.'

    }

    return undefined;


}