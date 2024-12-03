import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   selectedPage : 'Home',
   pageSelected : 'Home',
   IsSessionExpired : false,
   HistoryTab : 'Article',
   demo : 'demo'

};



const NavigationSlice = createSlice({
    name: 'Navigation',
    initialState,
    reducers: {

        setSelectedPage(state, action) {
            state.pageSelected  = action.payload;  
        },

        setIsSessionExpired(state, action){
            state.IsSessionExpired = action.payload
        },
       

        setHistoryTab(state, action){
            state.HistoryTab = action.payload
        },


        setdemo(state, action){
            state.demo = action.payload
        },
       
       
   
       
    },
});


export const {setSelectedPage,setIsSessionExpired,setHistoryTab} = NavigationSlice.actions;
export default NavigationSlice.reducer;
