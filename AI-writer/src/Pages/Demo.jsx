import React, { useState } from 'react'
import Axiosinstance from '../Axios/Axiosinstance'

function Demo() {
    const [topic, setTopic] = useState('')
    const [Article, setArticle] = useState('')

    const handleInput = (e) => {
        setTopic(e.target.value)

    }

    const clicked = async () => {
        if (!topic) {
            return
        }

        const data = {
            'topic': topic,
        } 

        try {
            const response = await Axiosinstance.post('api/generate-article', data)
            setArticle(response.data.article)



        }

        catch (error) {
        }
    }



    return (
        <>
            <div className='text-2xl '>Demo</div>
            <div className="flex space-x-2 ">
                <input type="text" onChange={handleInput} value={topic} className="w-48 bg-slate-100" />
                <button onClick={clicked} className="px-2 py-1 bg-sky-400">click</button>
            </div>
           {Article && ( <span className="">{Article}</span>)}
        </>
    )
}

export default Demo