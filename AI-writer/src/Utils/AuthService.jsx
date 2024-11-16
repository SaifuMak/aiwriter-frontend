
import Axiosinstance from "../Axios/Axiosinstance"
import { loginSuccess,setLogout } from "../Redux/Slices/AuthSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { ResetWordsCount } from "../Redux/Slices/AssetsSlice"
import {setWordsCount} from "../Redux/Slices/AssetsSlice"
import { setPlanDetails } from "../Redux/Slices/AssetsSlice"


export const GetLoginStatus = async (dispatch,setLoading) => {


    try {
      const response = await Axiosinstance.get('api/check_login_status')


      const email = response.data.email
      const username = response.data.name

      dispatch(loginSuccess({ username, email }));
      dispatch(ResetWordsCount())

      setLoading(false)
    }

    catch (error) {

    //   dispatch(setLogout())
      setLoading(false)


    }
  }





  export const getPlanDetails = async (dispatch) => {

    try {

      const response = await Axiosinstance.get('payment/get-assets-information')
      const ArticleWords = response.data.words_count
      const PlagiarisedWords = response.data.plaigarism_words
      const PlanName = response.data.name_of_plan
      const PlanAmount = response.data.amount
      const PlanPurchasedDate = response.data.created_at
      const AddOnArticleWords = response.data.add_on_words_count
      const AddOnPlagiarisedWords = response.data.add_on_plaigarism_words


      const RenewalDate = response.data.renewal_date

      dispatch(setWordsCount({ ArticleWords, PlagiarisedWords,AddOnArticleWords,AddOnPlagiarisedWords}))
      dispatch(setPlanDetails({PlanName,PlanAmount,PlanPurchasedDate,RenewalDate}))

    }

    catch (error) {
      console.log(error)
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
