
import Axiosinstance from "../Axios/Axiosinstance"
import { loginSuccess,setLogout } from "../Redux/Slices/AuthSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"


export const GetLoginStatus = async (dispatch,setLoading) => {


    try {
      const response = await Axiosinstance.get('api/check_login_status')


      const email = response.data.email
      const username = response.data.name

      dispatch(loginSuccess({ username, email }));

      setLoading(false)
    }

    catch (error) {

    //   dispatch(setLogout())
      setLoading(false)


    }
  }




export const handleLogout = async(dispatch,navigate) => {
  const data = null

    try {
        const response = await Axiosinstance.post('api/logout',data)
        dispatch(setLogout())
       
        
        navigate('/login')
    }

    catch (error) {
        dispatch(setLogout())
       

    }
}
