import { useDispatch, useSelector } from 'react-redux';
import {resetArticleGeneration} from '../Redux/Slices/ArticleGenerationSlice'

export function countWords(text) {
    // return text.split(/\s+/).filter(Boolean).length; // Split by whitespace and filter out empty strings
    const plainText = text.replace(/<[^>]+>/g, '');
    
    // Count words in the plain text
    return plainText.split(/\s+/).filter(Boolean).length;
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
