// articleGenerationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ArticleWords : 0,
    PlagiarisedWords : 0,
   
};  



const AssetsSlice = createSlice({
    name: 'Assets',
    initialState,

    reducers: {

        setWordsCount(state,action){
            state.ArticleWords = action.payload.ArticleWords;
            state.PlagiarisedWords = action.payload.PlagiarisedWords;

        },

        ResetWordsCount(state){
            state.ArticleWords = 0;
            state.PlagiarisedWords = 0;
        }
      
        
    },
});


export const {setWordsCount,ResetWordsCount} = AssetsSlice.actions;
export default AssetsSlice.reducer;
