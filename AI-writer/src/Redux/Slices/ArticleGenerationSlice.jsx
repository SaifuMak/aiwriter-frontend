// articleGenerationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 0,  // Start at step 0 by default
    title: '',
    refTitle :'',
    keywords: [],
    selectedKeywords: [],
    headlines : [],
    selectedHeadline : '',
    outline: [],
    articleStructure: {},
    loading: false,
    isFetching : false,
    selectedToneOfVoice : 'Professional',
    selectedPointOfView : 'Second-Person (You)'

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

        setCurrentStep(state, action) {
            state.currentStep = action.payload;  // Set loading state
        },

        setLoading(state, action) {
            state.loading = action.payload;  // Set loading state
        },

        setTitle(state, action) {
            state.title = action.payload; // Set title state 
        },

        setRefTitle(state, action) {
            state.refTitle = action.payload; // Set title state 
        },


        setKeywords(state, action) {
            state.keywords = action.payload; // Set keywords generated
        },

        setSelectedKeywordsRedux(state, action) {
            state.selectedKeywords = action.payload; // Set keywords selected
        },

        setToneOfVoice(state, action) {
            state.selectedToneOfVoice = action.payload; // Set selected tone of voice 
        },

        setPointOfView(state, action) {
            state.selectedPointOfView = action.payload; // Set selected Point of view
        },

        setHeadlines(state, action) {
            state.headlines = action.payload; // Set generated headlines
        },

        setSelectedHeadline(state, action) {
            state.selectedHeadline = action.payload; // Set selected headline 
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


export const {nextStep, previousStep,setRefTitle,setHeadlines,setSelectedHeadline, setSelectedKeywordsRedux, setLoading,setCurrentStep, setTitle, setKeywords, setToneOfVoice,setPointOfView, setOutline, setArticleStructure, resetArticleGeneration } = ArticleGenerationSlice.actions;
export default ArticleGenerationSlice.reducer;
