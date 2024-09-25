import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    response : null,
    contents : [],
    totalWords : null,
    result : [],
};


const PlagiarismSlice = createSlice({
    name: 'Plagiarism',
    initialState,
    reducers: {
        setResponse(state, action) {
            state.response  = action.payload;  // Move to the next step
        },
        setTotalWords(state, action){
            state.totalWords  = action.payload; 
        },
        setContents(state, action) {
            state.contents  = action.payload;  // Move to the next step
        },
        setResults(state, action) {
            state.result  = action.payload;  // Move to the next step
        },
        setResetResults(state, action) {
            state.result  = [];  // Move to the next step
        },
        resetContents(state) {
            state.contents  = [];  // Move to the next step
        },

    
    },
});


export const {setResponse,setContents,resetContents,setTotalWords,setResults,setResetResults} = PlagiarismSlice.actions;
export default PlagiarismSlice.reducer;
