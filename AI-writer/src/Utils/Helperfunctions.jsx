export function countWords(text) {
    return text.split(/\s+/).filter(Boolean).length; // Split by whitespace and filter out empty strings
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
