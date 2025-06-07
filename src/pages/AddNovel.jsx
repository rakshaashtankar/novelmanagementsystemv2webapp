import './PageStyles.css'
import axios from 'axios'

import React, { useState } from 'react'
import NovelForm from '../components/NovelForm'
import Header from '../components/Header.jsx'

const AddNovel = () => {

    const [data, setData] = useState({
            title: "",
            author: "",
            genre: "",
            synopsis: ""
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data.title);
    }

    const handleChange = (e) => {

    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <NovelForm mode='add'/>
        </div>
        
    )
}

export default AddNovel