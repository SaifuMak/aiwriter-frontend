import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    response : null,
    contents : null,
    totalWords : null
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
        resetContents(state) {
            state.contents  = null;  // Move to the next step
        },

    
    },
});


export const {setResponse,setContents,resetContents,setTotalWords} = PlagiarismSlice.actions;
export default PlagiarismSlice.reducer;
