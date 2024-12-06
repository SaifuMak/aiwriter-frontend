
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    
    IsAuthenticated: false,
    Username :'',
    Email:'',
    IsAdmin : false,
    

};


const AuthSlice = createSlice({
    name: 'AuthStatus',
    initialState,
    
    reducers: {

        loginSuccess(state,action) {
            state.IsAuthenticated = true;
            state.Username = action.payload.username;
            state.Email = action.payload.email;
            state.IsAdmin = action.payload.is_staff;
        },


        setLogout(state) {
           return initialState;
           
        },
    }
});

export const { setLogout, loginSuccess } = AuthSlice.actions;
export default AuthSlice.reducer;