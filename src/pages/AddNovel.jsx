import './PageStyles.css'
import axios from 'axios'

import React, { useState } from 'react'
import NovelForm from '../components/NovelForm'
import Header from '../components/Header.jsx'

const AddNovel = () => {

    const handleSubmit = (data) => {
        
    }


    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <NovelForm onSubmit={handleSubmit}/>
        </div>
        
    )
}

export default AddNovel