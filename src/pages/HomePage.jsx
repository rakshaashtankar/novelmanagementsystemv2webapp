import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import './PageStyles.css'
import SearchIcon from '../assets/search.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

import NovelModal from '../components/NovelModal.jsx';



const HomePage = () => {

    const [novels, setNovels] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const setData = async () => {
            const response = await axios.get('https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels');
            setNovels(response.data)
            console.log(novels);
        };  setData()
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels/${id}`) 
            setNovels(novels.filter(novel => novel.id !== id));
            setModalMessage(response.data);
            setIsModal(true);
        } catch (error) {
            console.error(error);
            setModalMessage(error.response?.data || "Something went wrong");
            setIsModal(true);
        }
    }


    const handleClose = () => {
        setIsModal(false);
    }

    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
        
            <div className="flex flex-col w-full px-5 py-6">
                {/* Search & Add Novel */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <img className="w-6 h-6" src={SearchIcon} alt="Search" />
                        <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-[#39afc6] px-4 py-2 rounded-sm text-white hover:bg-[#2e8ea2]"
                        onClick={() => navigate("/add")}
                    >
                        Add Novel
                    </button>
                </div>
        
                {/* Table */}
                <div className="bg-[#eff9fb] w-full rounded-lg shadow-md overflow-hidden">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-[#b0dfe8] text-left">
                        <tr>
                            <th className="px-3 py-2 border-b">ID</th>
                            <th className="px-3 py-2 border-b">Title</th>
                            <th className="px-3 py-2 border-b">Author</th>
                            <th className="px-3 py-2 border-b">Genre</th>
                            <th className="px-3 py-2 border-b">Synopsis</th>
                            <th className="px-3 py-2 border-b">Edit</th>
                            <th className="px-3 py-2 border-b">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {novels.map((novel) => (
                            <tr key={novel.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 border-b">{novel.id}</td>
                            <td className="px-3 py-2 border-b">{novel.novelTitle}</td>
                            <td className="px-3 py-2 border-b">{novel.novelAuthor}</td>
                            <td className="px-3 py-2 border-b">{novel.novelGenre}</td>
                            <td className="px-3 py-2 border-b max-w-[200px] break-words">
                                {novel.novelSynopsis}
                            </td>
                            <td className="px-3 py-2 border-b">
                                <PencilSquareIcon className="h-7 w-7 hover:text-[#57bbcf]" onClick={() => navigate("/edit", { state: novel})} />
                            </td>
                            <td className="px-3 py-2 border-b">
                                <TrashIcon className="h-7 w-7 hover:text-[#c40000]"  onClick={() => handleDelete(novel.id)}/>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <NovelModal
                isOpen={isModal}
                onClose={handleClose}
                txtMessage={modalMessage}
            />
        </div>
    );
}

export default HomePage