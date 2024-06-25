import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { RiLoader5Fill } from "react-icons/ri"
import Header from "../Components/Header"
import { FaSpinner } from 'react-icons/fa'
import Status from '../Components/Status'

const Track = () => {
    const parameter = useParams()
    const trackId = parameter.id
    const [isLoading, setIsLoading] = useState(true)
    setTimeout(() => {
        setIsLoading(false)
    }, 3000);
    return(
        <>
           <Header />
           <div className='flex h-screen'>
                <div className='m-auto'>
                    {isLoading && <FaSpinner className='w-6 animate-spin text-yellow-600' />}
                    {!isLoading && <Status trackId={ trackId} /> }
                </div>
            </div>
        </>
    )
}
export default Track