import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   ArticleWriterSelected : '/article-generation',
   FinalArticleWriterSelected : '/article-generation'

};


const SelectedToolSlice = createSlice({
    name: 'SelectedTool',
    initialState,
    reducers: {

        setArticleWriterSelected(state, action) {
            state.ArticleWriterSelected  = action.payload;  
        },
        setFinalArticleWriterSelected(state, action) {
            state.FinalArticleWriterSelected  = action.payload;  
        },
       
    },
});


export const {setArticleWriterSelected,setFinalArticleWriterSelected,} = SelectedToolSlice.actions;
export default SelectedToolSlice.reducer;
