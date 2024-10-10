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
    

};


const ArticleRewriterSlice = createSlice({
    name: 'ArticleRewriter',
    initialState,
    
    reducers: {
        setArticleRewriterStep(state, action) {
            state.results  = action.payload;  // Move to the next step
        },
        setKeywordsForRewriting(state, action) {
            state.KeywordsForRewriting  = action.payload;  // Move to the next step
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
        }

    
    
    },
});


export const {setContentForRewriting,setKeywordsForRewriting,setSubmittedArticle,setEnteredKeywordsForArticleRewriter,setArticleRewriterStep,nextArticleRewriterStep,prevArticleRewriterStep,setToneOfVoiceArticleRewriter,setPointOfViewArticleRewriter,setSelectedWordlimitArticleRewriter} = ArticleRewriterSlice.actions;
export default ArticleRewriterSlice.reducer;
