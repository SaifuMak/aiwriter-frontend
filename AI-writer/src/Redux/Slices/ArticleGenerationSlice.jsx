// articleGenerationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 1,  // Start at step 1 by default
    title: '',
    keywords: [],
    outline: [],
    articleStructure: {},
    loading: true,
    // Add any other initial state you need
};  


const ArticleGenerationSlice = createSlice({
    name: 'ArticleGeneration',
    initialState,
    reducers: {
        nextStep(state) {
            state.currentStep += 1;  // Move to the next step
        },
        previousStep(state) {
            state.currentStep -= 1;  // Move to the previous step
        },
        setLoading(state, action) {
            state.loading = action.payload;  // Set loading state
        },
        setTitle(state, action) {
            state.title = action.payload;
        },
        setKeywords(state, action) {
            state.keywords = action.payload;
        },
        setOutline(state, action) {
            state.outline = action.payload;
        },
        setArticleStructure(state, action) {
            state.articleStructure = action.payload;
        },
        resetArticleGeneration() {
            return initialState;  // Reset to initial state
        },
    },
});


export const {nextStep, previousStep, setLoading, setTitle, setKeywords, setOutline, setArticleStructure, resetArticleGeneration } = ArticleGenerationSlice.actions;
export default ArticleGenerationSlice.reducer;
