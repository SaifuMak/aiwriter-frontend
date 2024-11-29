import React,{useState} from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setHistoryTab } from '../../../Redux/Slices/NavigationSlice'


function ToggleButtton() {
    const dispatch = useDispatch()
    const { HistoryTab } = useSelector(state => state.Navigation);

    //  const [SelectedTab, setSelectedTab] = useState('Article')

     const handleToggle = (option)=>{
        dispatch(setHistoryTab(option))
        // setSelectedTab(option)
     }
     
     
    return (
        <div className="flex p-1.5 ml-6 rounded-md cursor-pointer w-42 bg-custom-light-orange">
            
            <button onClick={()=>handleToggle('Article')} className={`px-2 py-1  tracking-wider ${HistoryTab === 'Article' ? 'bg-custom-dark-orange font-semibold text-white  rounded-md' : ''}   `}>Article</button>
            <button onClick={()=>handleToggle('Plagiarism')} className={`px-2 py-1  tracking-wider ${HistoryTab === 'Plagiarism' ? 'bg-custom-dark-orange font-semibold text-white  rounded-md' : ''}`}>Plagiarism</button>

        </div>
   
    )
}

export default ToggleButtton