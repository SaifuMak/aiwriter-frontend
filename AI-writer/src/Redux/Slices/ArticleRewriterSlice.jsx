import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    ArticleRewriterStep : 0,
    SubmittedArticle : '',
    EnteredKeywordsForArticleRewriter :'',
    selectedToneOfVoiceArticleRewriter : 'Professional',
    selectedPointOfViewArticleRewriter : 'Second-Person (You)',
    selectedWordlimitArticleRewriter : 'No Limit',
    ContentForRewriting : '',
    KeywordsForRewriting : '',
    ArticleRewrited: '',
    IsRewriteArticleLoadingCompleted : false,
};




const ArticleRewriterSlice = createSlice({
    name: 'ArticleRewriter',
    initialState,
    

    reducers: {
       
        setKeywordsForRewriting(state, action) {
            state.KeywordsForRewriting  = action.payload;  // Move to the next step
        },

        nextArticleRewriterStep(state){
            state.ArticleRewriterStep += 1
        },

        prevArticleRewriterStep(state){
            state.ArticleRewriterStep -= 1
        },

        SetArticleRewriterStep(state,action){
            state.ArticleRewriterStep = action.payload;
        },

        setToneOfVoiceArticleRewriter(state, action) {
            state.selectedToneOfVoiceArticleRewriter = action.payload; // Set selected tone of voice 
        },

        setPointOfViewArticleRewriter(state, action) {
            state.selectedPointOfViewArticleRewriter = action.payload; // Set selected Point of view
        },

        setSelectedWordlimitArticleRewriter(state,action){
            state.selectedWordlimitArticleRewriter = action.payload;
        },

        setContentForRewriting(state, action){
            state.ContentForRewriting =  action.payload;
        },

        setSubmittedArticle(state, action){
            state.SubmittedArticle = action.payload;
        },

        setEnteredKeywordsForArticleRewriter(state,action){
            state.EnteredKeywordsForArticleRewriter = action.payload;
        },

        setArticleRewrited(state, action){
            state.ArticleRewrited = action.payload;
        },

        ResetArticleRewrited(state){
            state.ArticleRewrited = '';
        },

        setIsRewriteArticleLoadingCompleted(state, action){
            state.IsRewriteArticleLoadingCompleted = action.payload;
        },


        ResetRewriteArticle() {
            return initialState;  // Reset to initial state
        },

      
    },
});


export const {setContentForRewriting,setArticleRewrited,SetArticleRewriterStep,ResetArticleRewrited,setIsRewriteArticleLoadingCompleted,setKeywordsForRewriting,setSubmittedArticle,setEnteredKeywordsForArticleRewriter,setArticleRewriterStep,nextArticleRewriterStep,prevArticleRewriterStep,setToneOfVoiceArticleRewriter,setPointOfViewArticleRewriter,setSelectedWordlimitArticleRewriter,ResetRewriteArticle} = ArticleRewriterSlice.actions;
export default ArticleRewriterSlice.reducer;
