import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   
   currentPageOfAdmin : 'Dashboard',
 

};


const AdminSlice = createSlice({
    name: 'Adminslice',
    initialState,
    reducers: {

        setPageOfAdmin(state,action){
            state.currentPageOfAdmin = action.payload
        },
       
    },
});


export const {setPageOfAdmin} = AdminSlice.actions;
export default AdminSlice.reducer;
