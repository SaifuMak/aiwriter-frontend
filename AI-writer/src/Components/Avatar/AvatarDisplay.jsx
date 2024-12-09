import React, { useState } from 'react'
// import avatarList from './AvatarList'
import hatboy from '../../assets/Avatars/hatboy.png'

function AvatarDisplay() {
    
    const [selectedId, setSelectedId] = useState(null);

    
 const avatarList = [
    { id: 1, img: hatboy, alt: 'Cartoon Girl' },
    { id: 2, img: hatboy, alt: 'Cartoon Girl 2' },
    { id: 3, img: hatboy, alt: 'Cartoon Girl 3' },
  ];

    const handleAvatarClick = (id) => {

        setSelectedId(id)
    }

    return (
        <div className="grid w-full grid-cols-3 gap-4 bg-red-100">
            {avatarList.map((avatar) => (
                <div
                    key={avatar.id}
                    onClick={() => handleAvatarClick(avatar.id)}
                    className={`p-2 border ${selectedId === avatar.id ? 'border-blue-500' : 'border-gray-300'
                        } cursor-pointer`}
                >
                    <img src={avatar.img} alt={avatar.alt} className="w-16 h-16" />
                </div>
            ))}
        </div>
    )
}

export default AvatarDisplay