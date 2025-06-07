import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import './PageStyles.css'
import SearchIcon from '../assets/search.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';



const HomePage = () => {
    const [novels, setNovels] = useState([]);

    useEffect(() => {
        const setData = async () => {
            const response = await axios.get('https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels');
            setNovels(response.data)
            console.log(novels);
        };  setData()
    }, []);

    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 items-center justify-center">
                <div className="m-5 p-10 bg-[#eff9fb]">
                    <div className='flex items-center justify-between '>
                        <div className=' flex items-center'>
                            <img  className='w-7 h-7 mr-2' src={SearchIcon} /> 
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-[20vw] border rounded px-2 py-1 focus:outline-none focus:border-blue-500 w-full placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <button type='button' className='bg-[#39afc6] px-4 py-2 rounded-sm' onClick={() => navigate("/add")}>Add Novel</button>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-b-gray-400 rounded-lg">
                                <thead className="bg-[#b0dfe8]">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b">ID</th>
                                        <th className="px-4 py-2 text-left border-b">Title</th>
                                        <th className="px-4 py-2 text-left border-b">Author</th>
                                        <th className="px-4 py-2 text-left border-b">Genre</th>
                                        <th className="px-4 py-2 text-left border-b">Synopsis</th>
                                        <th className="px-4 py-2 text-left border-b">Edit</th>
                                        <th className="px-4 py-2 text-left border-b">Dlete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {novels.map((novel) => (
                                        <tr key={novel.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">{novel.id}</td>
                                            <td className="px-4 py-2 border-b">{novel.novelTitle}</td>
                                            <td className="px-4 py-2 border-b">{novel.novelAuthor}</td>
                                            <td className="px-4 py-2 border-b">{novel.novelGenre}</td>
                                            <td className="px-4 py-2 border-b">{novel.novelSynopsis}</td>
                                            <td className="px-4 py-2 border-b"><PencilSquareIcon className="hover:text-[#57bbcf]"/></td>
                                            <td className="px-4 py-2 border-b"><TrashIcon className="h-7 w-7 hover:text-[#c40000] "/></td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage