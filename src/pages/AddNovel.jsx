import './PageStyles.css'
import axios from 'axios'

import React, { useState } from 'react'
import NovelForm from '../components/NovelForm'
import Header from '../components/Header.jsx'
import { Navigate } from 'react-router-dom'

const AddNovel = () => {

    

    const handleSubmit = async (data) => {
        console.log(data);
        const response = await axios.post('https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels', {
            "novelTitle": data.title,
            "novelAuthor": data.author,
            "novelGenre": data.genre,
            "novelSynopsis": data.synopsis
        });

        console.log(response.data);
    }


    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <NovelForm onSubmit={handleSubmit}/>
        </div>
        
    )
}

export default AddNovel