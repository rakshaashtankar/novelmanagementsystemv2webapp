import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import NovelForm from '../components/NovelForm';
import NovelModal from '../components/NovelModal.jsx';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditNovel = () => {

    const location = useLocation();
    const novel = location.state;

    const [isModal, setIsModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isNavigate, setIsNavigate] = useState(true);
    const navigate = useNavigate();


    const handleSubmit = async (data) => {
        try {
            console.log(data);
            const response = await axios.put(`https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels/${novel.id}`, 
                {
                    novelTitle: data.title,
                    novelAuthor: data.author,
                    novelGenre: data.genre,
                    novelSynopsis: data.synopsis,
                }
            )
            console.log(response.data);
            setIsModal(true);
            setModalMessage("Edited successfully.");
            setIsNavigate(true);
        } catch(error) {
            console.error(error);
            setIsModal(true);
            setModalMessage("Something went wrong.")
            setIsNavigate(false);
        }
    }

    const handleClose = () => {
        setIsModal(false);
        if(isNavigate) {
            navigate('/');
        }
    }


    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <NovelForm novelData={novel} mode='edit' onSubmit={handleSubmit} />
            <NovelModal
                isOpen={isModal}
                onClose={handleClose}
                txtMessage={modalMessage}
            />
        </div>
    )
}

export default EditNovel