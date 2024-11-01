
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    
    IsAuthenticated: false,
    Username :'',
    Email:'',
    // Profile_img :profile
    
};



const AuthSlice = createSlice({
    name: 'AuthStatus',
    initialState,
    
    reducers: {
        loginSuccess(state,action) {
            state.IsAuthenticated = true;
            state.Username = action.payload.username;
            state.Email = action.payload.email;
        },


        setLogout(state) {
            state.IsAuthenticated = false;
            state.Username = '';
            state.Email = '';
           
        },
    }
});

export const { setLogout, loginSuccess } = AuthSlice.actions;
export default AuthSlice.reducer;