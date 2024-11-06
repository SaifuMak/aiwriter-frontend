import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   selectedPage : 'Home',
   pageSelected : 'Home',
   IsSessionExpired : false,
 

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
        }
   
       
    },
});


export const {setSelectedPage,setIsSessionExpired} = NavigationSlice.actions;
export default NavigationSlice.reducer;
