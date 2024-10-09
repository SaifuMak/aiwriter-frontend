import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    ArticleRewriterStep : 0,
    selectedToneOfVoiceArticleRewriter : 'Professional',
    selectedPointOfViewArticleRewriter : 'Second-Person (You)',
};


const ArticleRewriterSlice = createSlice({
    name: 'ArticleRewriter',
    initialState,
    
    reducers: {
        setArticleRewriterStep(state, action) {
            state.results  = action.payload;  // Move to the next step
        },
        nextArticleRewriterStep(state){
            state.ArticleRewriterStep += 1
        },
        prevArticleRewriterStep(state){
            state.ArticleRewriterStep -= 1
        },
        setToneOfVoiceArticleRewriter(state, action) {
            state.selectedToneOfVoiceArticleRewriter = action.payload; // Set selected tone of voice 
        },

        setPointOfViewArticleRewriter(state, action) {
            state.selectedPointOfViewArticleRewriter = action.payload; // Set selected Point of view
        },

        

    
    },
});


export const {setArticleRewriterStep,nextArticleRewriterStep,prevArticleRewriterStep,setToneOfVoiceArticleRewriter,setPointOfViewArticleRewriter} = ArticleRewriterSlice.actions;
export default ArticleRewriterSlice.reducer;
