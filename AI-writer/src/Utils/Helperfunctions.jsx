export function countWords(text) {
    return text.split(/\s+/).filter(Boolean).length; // Split by whitespace and filter out empty strings
}

// Utility function to calculate the number of characters
export function countCharacters(text) {
    return text.length; // Total number of characters
}
