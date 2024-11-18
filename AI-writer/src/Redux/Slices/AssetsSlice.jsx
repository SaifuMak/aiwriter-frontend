// articleGenerationSlice.js
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    ArticleWords: 0,
    PlagiarisedWords: 0,
    AddOnArticleWords: 0,
    AddOnPlagiarisedWords: 0,
    PlanName: 'Nil',
    PlanAmount: 0,
    PlanPurchasedDate: 'Nil',
    RenewalDate: 'Nil'
};



const AssetsSlice = createSlice({
    name: 'Assets',
    initialState,

    reducers: {

        setWordsCount(state, action) {
            state.ArticleWords = action.payload.ArticleWords;
            state.PlagiarisedWords = action.payload.PlagiarisedWords;
            state.AddOnArticleWords = action.payload.AddOnArticleWords;
            state.AddOnPlagiarisedWords = action.payload.AddOnPlagiarisedWords;

        },

        setPlanDetails(state, action) {
            state.PlanAmount = action.payload.PlanAmount;
            state.PlanName = action.payload.PlanName;
            state.PlanPurchasedDate = action.payload.PlanPurchasedDate;
            state.RenewalDate = action.payload.RenewalDate;
        },

        ResetWordsCount(state) {
          return initialState;
        }

    },
});


export const { setWordsCount, ResetWordsCount, setPlanDetails } = AssetsSlice.actions;
export default AssetsSlice.reducer;
