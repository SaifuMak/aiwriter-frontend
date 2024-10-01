import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   selectedPage : 'Home',
   pageSelected : 'Home',
 

};


const NavigationSlice = createSlice({
    name: 'Navigation',
    initialState,
    reducers: {

        setSelectedPage(state, action) {
            state.pageSelected  = action.payload;  
        },
   
       
    },
});


export const {setSelectedPage} = NavigationSlice.actions;
export default NavigationSlice.reducer;
