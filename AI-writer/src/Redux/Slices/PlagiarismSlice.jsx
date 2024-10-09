import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    article : '',
    response : null,
    contents : [],
    totalWords : null,
    result : [],
    winstonResult :null,
    results : null,
};


const PlagiarismSlice = createSlice({
    name: 'Plagiarism',
    initialState,
    reducers: {
        setWinstonResult(state, action) {
            state.results  = action.payload;  // Move to the next step
        },
        ResetWinstonResult(state) {
            state.results  = null;  // Move to the next step
        },
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
        setArticle(state, action) {
            state.article  = action.payload;  // Move to the next step
        },
        ResetArticle(state) {
            state.contents  = '';  // Move to the next step
        },


    
    },
});


export const {setWinstonResult,ResetWinstonResult,setResponse,setContents,setArticle,ResetArticle,resetContents,setTotalWords,setResults,setResetResults} = PlagiarismSlice.actions;
export default PlagiarismSlice.reducer;
