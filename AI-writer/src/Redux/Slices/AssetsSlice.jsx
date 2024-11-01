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

        }
        // setSelectedArticleWriter(state,action){
        //     state.SelectedArticleWriter = action.payload;
        // },
        
    },
});


export const {setWordsCount} = AssetsSlice.actions;
export default AssetsSlice.reducer;
