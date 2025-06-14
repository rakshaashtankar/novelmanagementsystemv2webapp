import './PageStyles.css';
import axios from 'axios';
import React, { useState } from 'react';
import NovelForm from '../components/NovelForm';
import Header from '../components/Header.jsx';
import NovelModal from '../components/NovelModal.jsx';
import { useNavigate } from 'react-router-dom';

const AddNovel = () => {
    const [isModal, setIsModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isNavigate, setIsNavigate] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            const response = await axios.post(
                'https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels',
                {
                    novelTitle: data.title,
                    novelAuthor: data.author,
                    novelGenre: data.genre,
                    novelSynopsis: data.synopsis,
                }
            );
            setModalMessage(response.data);
            setIsModal(true);
            setIsNavigate(true);
        } catch (error) {
            console.error(error);
            setModalMessage(error.response?.data || 'Something went wrong!');
            setIsModal(true);
            setIsNavigate(false);
        }
    };

    const handleClose = () => {
        setIsModal(false);
        if(isNavigate) {
            navigate('/');
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <NovelForm onSubmit={handleSubmit} />
            <NovelModal
                isOpen={isModal}
                onClose={handleClose}
                txtMessage={modalMessage}
            />
        </div>
    );
};

export default AddNovel;
