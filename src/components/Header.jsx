import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Header = ({isHome=false}) => {
    const navigate = useNavigate();
    return (
        <header className='sticky top-0 z-20 mx-auto flex w-full items-center justify-between bg-[#2d8c9f] p-3'>
            <div className='flex items-center justify-start'>
                <img className='w-10 h-10' src={logo} alt="Logo" />
                <h1 className='ml-2 text-white font-bold'>Novel Management System</h1>
            </div>
            <div className='flex items-center justify-end'>
                {
                    (!isHome) ?  
                    <button 
                    className='px-4 py-2 text-white rounded-md  hover:font-bold '
                    onClick={() => {
                        navigate('/');
                    }}> Home
                    </button>
                    : "" 
                }
                
                
                    
            </div>
        </header>
    )
}

export default Header