// articleGenerationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 0,  // Start at step 0 by default
    title: '',
    refTitle :'',
    isManualKeywordsEnabled : false,
    keywords: [],
    selectedKeywords: '',
    isManualHeadlineEnabled : false,
    headlines : [],
    selectedHeadline : '',
    outline: {}, // generated outlines
    selectedOutlines: [], // selected outlines 
    selectedOutlineKey : '',  // selected main title or key of  the outline
    ReorderedSelectedOutlines: [], // Reordered selected outlines 
    articleStructure: {},
    finalArticle : '',
    loading: false,
    isFetching : false,
    isIndividualOutlines : false, // state showing whether user selected the individual outline selection option 
    selectedToneOfVoice : 'Professional',
    selectedPointOfView : 'Second-Person (You)',
    selectedWordLimit : '1000',
    IsScrolled : false,

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
        
        ResetKeywords(state) {
            state.keywords = []; // Set keywords generated
        },


        setisManualKeywordsEnabled(state){
            state.isManualKeywordsEnabled = !state.isManualKeywordsEnabled;
        },

        setSelectedKeywordsRedux(state, action) {
            state.selectedKeywords = action.payload; // Set keywords selected
        },
        ResetSelectedKeywordsRedux(state) {
            state.selectedKeywords = ''; // Set keywords selected
        },

        setToneOfVoice(state, action) {
            state.selectedToneOfVoice = action.payload; // Set selected tone of voice 
        },

        setPointOfView(state, action) {
            state.selectedPointOfView = action.payload; // Set selected Point of view
        },

        setWordLimit(state, action) {
            state.selectedWordLimit = action.payload; // Set selected Point of view
        },
        setisManualHeadlinesEnabled(state){
            state.isManualHeadlineEnabled = !state.isManualHeadlineEnabled;
        },

        setHeadlines(state, action) {
            state.headlines = action.payload; // Set generated headlines
        },

        setSelectedHeadline(state, action) {
            state.selectedHeadline = action.payload; // Set selected headline 
        },
        ResetSelectedHeadline(state) {
            state.selectedHeadline = ''; // Set selected headline 
        },

        setOutlines(state, action) {
            state.outline = action.payload; // Set all generated outlines 
        },
        ClearOutlines(state) {
            state.outline = {}; // clear all outlines 
        },

        ClearSelectedOutlines(state){
            state.selectedOutlines = []; // clear all selected outlines
        },

        setSelectedOutlines(state, action){
            state.selectedOutlines.push(action.payload) // add all individual outlines to the state 
        },

        RemoveSelectedOutlines(state, action){
            state.selectedOutlines = state.selectedOutlines.filter(content => content !== action.payload) // unselect the  individual outlines from  the state 
        },

        SetSelectedOutlineKey(state, action){
            state.selectedOutlineKey = action.payload;  // set the key or title of the selected outline 
        },

        setIsIndividualOutlines(state, action) {
            state.isIndividualOutlines = action.payload; // a bolean value to toggle the individual outline selection option 
        },

        setReorderedSelectedOutlines(state, action){
            state.ReorderedSelectedOutlines = action.payload; // unselect the  individual outlines from  the state 
        },

        resetReorderedSelectedOutlines(state) {
            state.ReorderedSelectedOutlines = []; // Reset to the initial value
        },

        setArticleStructure(state, action) {
            state.articleStructure = action.payload;
        },
        setFinalArticle(state, action){
            state.finalArticle = action.payload;
        },
        resetFinalArticle(state) {
            state.finalArticle = ''; // Reset to the initial value
        },

        resetArticleGeneration() {
            return initialState;  // Reset to initial state
        },
        setIsScrolling(state){
            state.IsScrolled = true;
        },
        setScrollingfalse(state){
            state.IsScrolled = false;
        }
    },
});


export const {nextStep, previousStep,setRefTitle,ResetKeywords,ResetSelectedKeywordsRedux,setisManualHeadlinesEnabled, setHeadlines,setSelectedHeadline,ResetSelectedHeadline, setSelectedKeywordsRedux, setLoading,setCurrentStep, setTitle, setKeywords, setisManualKeywordsEnabled, setToneOfVoice,setPointOfView,setWordLimit, setOutlines,ClearOutlines, ClearSelectedOutlines, setIsIndividualOutlines  ,setSelectedOutlines,RemoveSelectedOutlines,SetSelectedOutlineKey, setArticleStructure, resetArticleGeneration,setReorderedSelectedOutlines,setFinalArticle,resetFinalArticle,resetReorderedSelectedOutlines,setIsScrolling,setScrollingfalse } = ArticleGenerationSlice.actions;
export default ArticleGenerationSlice.reducer;
