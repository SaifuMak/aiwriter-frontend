// articleGenerationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ArticleWords : 0,
    PlagiarisedWords : 0,
    PlanName : 'Nil',
    PlanAmount : 0,
    PlanPurchasedDate : 'Nil',
    RenewalDate : 'Nil'
};  



const AssetsSlice = createSlice({
    name: 'Assets',
    initialState,

    reducers: {

        setWordsCount(state,action){
            state.ArticleWords = action.payload.ArticleWords;
            state.PlagiarisedWords = action.payload.PlagiarisedWords;

        },

        setPlanDetails(state,action){
            state.PlanAmount = action.payload.PlanAmount;
            state.PlanName = action.payload.PlanName;
            state.PlanPurchasedDate = action.payload.PlanPurchasedDate;
            state.RenewalDate = action.payload.RenewalDate;
        },

        ResetWordsCount(state){
            state.ArticleWords = 0;
            state.PlagiarisedWords = 0;
        }
      
        
    },
});


export const {setWordsCount,ResetWordsCount,setPlanDetails} = AssetsSlice.actions;
export default AssetsSlice.reducer;
