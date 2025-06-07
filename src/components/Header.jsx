import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <header className='sticky top-0 z-20 mx-auto flex w-full items-center justify-start bg-[#2d8c9f] p-3'>
            <img className='w-10 h-10' src={logo}/>
            <h1 className='ml-2 text-white font-bold'>Novel Management System</h1>
        </header>
    )
}

export default Header