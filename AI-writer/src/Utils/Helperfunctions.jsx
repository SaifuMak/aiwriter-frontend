import { useDispatch, useSelector } from 'react-redux';
import {resetArticleGeneration} from '../Redux/Slices/ArticleGenerationSlice'




export const convertDate = (date) => {
    // Convert date to YYYY-MM-DD format
    // const formattedDate = date.toISOString().split('T')[0]; // "2024-12-02"
    const formattedDate = date.toLocaleDateString('en-CA'); // "2024-12-02"
    // Send the formatted date to Django
   return formattedDate;
  };


export function countWords(text) {
    // return text.split(/\s+/).filter(Boolean).length; // Split by whitespace and filter out empty strings
    // const plainText = text.replace(/<[^>]+>/g, '');
    
    // Count words in the plain text
    return  text.split(/\s+/).filter(Boolean).length;
}

export function truncateText(text,maxLength){
    return text.slice(0,maxLength) + '...';
}

export  function truncateUrl(url,maxLength){
    const trimmedUrl = url.replace(/^https?:\/\//, '');
    if(trimmedUrl.length > maxLength){
        return trimmedUrl.slice(0,maxLength) + '...';
    }
    return trimmedUrl
    
}

// Utility function to calculate the number of characters
export function countCharacters(text) {
    return text.length; // Total number of characters
}


// Utility function to calculate total words across all sections
export function calculateTotalWords(sections) {
    return Object.values(sections)
        .reduce((total, content) => total + countWords(content), 0); // Sum of words from all sections
}


// Utility function to calculate total characters across all sections
export function calculateTotalCharacters(sections) {
    return Object.values(sections)
        .reduce((total, content) => total + countCharacters(content), 0); // Sum of characters from all sections
}


export function FindPercentage(part,whole){
    if(whole === 0){
        return 0;
    }
    const percentage = (part/whole) * 100;
    return percentage.toFixed(0)
}

export function ResetArticleGenerator(dispatch){
    dispatch(resetArticleGeneration())
    

}

export function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};


export const getTotalPagesCount = (TotalData,ItemsPerpage) =>{
    return Math.ceil(TotalData/ItemsPerpage)
}

export const getPageNumber = (url) => {
    if(url){
        const urlObj = new URL(url);  // Create a URL object from the string
        const params = new URLSearchParams(urlObj.search);  // Get the query parameters
    
        const page = params.get('page');  // Extract the value of 'page' parameter
        if(page){
            return page;  // Return the page number (string)

        }
        else {
            return 1
        }
    

    }
    else{
        return null
    }
   
};

export function isPasswordStrong (password)  {
    // Regular expression to check if the password is at least 8 characters long,
    // and contains both letters and numbers.
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Test the password against the regex
    return strongPasswordRegex.test(password);
};



