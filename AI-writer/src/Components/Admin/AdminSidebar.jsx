import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";
import { TiHomeOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux'
import { setPageOfAdmin } from '../../Redux/Slices/AdminSlice';
import { FaUsers } from "react-icons/fa6";
import { VscBellDot } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import SideBarMenuItem from './SmallComponents/SideBarMenuItem';



function AdminSidebar() {
    const dispatch = useDispatch()
    const { currentPageOfAdmin } = useSelector(state => state.Adminslice);

    const getMenuStyle = (page) => {
        return page === currentPageOfAdmin ? 'text-white bg-custom-dark-orange' : 'text-white'
    }

    const handleComponentChange  =(component)=>{
        dispatch(setPageOfAdmin(component))
    }

    return (
        <div className="">
            <section  className="flex flex-col justify-start w-full space-y-1 ">
                <SideBarMenuItem Icon={TiHomeOutline} currentPageOfAdmin={currentPageOfAdmin} label="Dashboard" handleComponentChange={handleComponentChange} getMenuStyle={getMenuStyle} />
                <SideBarMenuItem Icon={FaUsers} currentPageOfAdmin={currentPageOfAdmin} label="Manage Users" handleComponentChange={handleComponentChange} getMenuStyle={getMenuStyle} />
                <SideBarMenuItem Icon={VscBellDot} currentPageOfAdmin={currentPageOfAdmin} label="Subscriptions" handleComponentChange={handleComponentChange} getMenuStyle={getMenuStyle} />
                <SideBarMenuItem Icon={FaUserTie} currentPageOfAdmin={currentPageOfAdmin} label="Moderators" handleComponentChange={handleComponentChange} getMenuStyle={getMenuStyle} />
                <SideBarMenuItem Icon={IoMdSettings} currentPageOfAdmin={currentPageOfAdmin} label="Settings" handleComponentChange={handleComponentChange} getMenuStyle={getMenuStyle} />
            </section>

        </div>

    )
}

export default AdminSidebar