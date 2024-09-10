import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    response : null,
    contents : null,
};


const PlagiarismSlice = createSlice({
    name: 'Plagiarism',
    initialState,
    reducers: {
        setResponse(state, action) {
            state.response  = action.payload;  // Move to the next step
        },
        setContents(state, action) {
            state.contents  = action.payload;  // Move to the next step
        },

    
    },
});


export const {setResponse,setContents} = PlagiarismSlice.actions;
export default PlagiarismSlice.reducer;
