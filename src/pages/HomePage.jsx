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
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchedNovels, setSearchedNovels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [size, setsize] = useState(5);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if(!isSearchActive) {
            fetchNovels();
        }
    }, [page, size]);

    const fetchNovels = async () => {
        try {
            // const response = await axios.get('https://novelmanagementsystemv2springbootproject-production.up.railway.app/api/novels');
            const response = await axios.get(`http://localhost:8080/api/novels?page=${page}&rows=${size}`, {
                params:{page, size},
            });
            setNovels(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

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

    const hancdleSearchChange = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        const modifiedSearchTerm = searchTerm.replace(/ /g, '+');
    
        const fetchSearchedNovels = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/novels/search", {
                    params: {
                        term: modifiedSearchTerm,
                        page: 0, // use 0 directly
                        size: size
                    }
                });
                setSearchedNovels(response.data.content);
                setTotalPages(response.data.totalPages);
                setPage(0); // then update page state
                setIsSearchActive(true);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
    
        fetchSearchedNovels();
    };
    

    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header isHome={true} />
        
            <div className="flex flex-col w-full px-5 py-6">
                
                {/* Search & Add Novel */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search..."
                        onChange={hancdleSearchChange}
                        onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                handleSearch();
                                }
                            }}
                        className="border rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                        />
                        <img className="w-6 h-6" 
                            src={SearchIcon} 
                            alt="Search" 
                            onClick={handleSearch} />
                    </div>
                    <button
                        type="button"
                        className="bg-[#39afc6] px-4 py-2 rounded-sm text-white hover:bg-[#2e8ea2] hover:font-bold"
                        onClick={() => navigate("/add")}
                    >
                        Add Novel
                    </button>
                </div>

                {/* Rows + Reset Search */}
                <div className="w-full mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Dropdown for No. of Rows */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="size" className="text-gray-600 text-sm">Rows</label>
                        <select
                        id="size"
                        className="border border-gray-300 rounded-sm px-3 py-2"
                        value={size}
                        onChange={(e) => setsize(Number(e.target.value))}
                        >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        </select>
                    </div>

                    {/* Conditionally Rendered Reset Search Button */}
                    {isSearchActive && (
                        <button
                        className="bg-[#39afc6] px-4 py-2 rounded-sm text-white hover:bg-[#2e8ea2] hover:font-bold"
                        onClick={() => {
                            setIsSearchActive(false);
                            setSearchTerm('');
                            setPage(0);
                        }}
                        >
                        Reset Search
                        </button>
                    )}
                </div>


                
        
                {/* Table */}
                <div className="bg-[#eff9fb] w-full rounded-lg shadow-md overflow-hidden">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-[#b0dfe8] text-left">
                        <tr>
                            <th className="px-3 py-2 border-b border-[#36a8be] ">ID</th>
                            <th className="px-3 py-2 border-b border-[#36a8be]">Title</th>
                            <th className="px-3 py-2 border-b border-[#36a8be]">Author</th>
                            <th className="px-3 py-2 border-b border-[#36a8be]">Genre</th>
                            <th className="px-3 py-2 border-b border-[#36a8be]">Synopsis</th>
                            <th className="px-3 py-2 border-b border-[#36a8be]">Edit</th>
                            <th className="px-3 py-2 border-b border-[#36a8be]">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {(isSearchActive ? searchedNovels : novels).length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                            No novels found.
                                        </td>
                                    </tr>
                                ) : (
                                    (isSearchActive ? searchedNovels : novels).map((novel) => (
                                        <tr key={novel.id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 border-b border-[#c9e9f0]">{novel.id}</td>
                                            <td className="px-3 py-2">{novel.novelTitle}</td>
                                            <td className="px-3 py-2">{novel.novelAuthor}</td>
                                            <td className="px-3 py-2">{novel.novelGenre}</td>
                                            <td className="px-3 py-2 max-w-[200px] break-words">
                                                {novel.novelSynopsis}
                                            </td>
                                            <td className="px-3 py-2">
                                                <PencilSquareIcon
                                                    className="h-7 w-7 hover:text-[#57bbcf] cursor-pointer"
                                                    onClick={() => navigate('/edit', { state: novel })}
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <TrashIcon
                                                    className="h-7 w-7 hover:text-[#c40000] cursor-pointer"
                                                    onClick={() => handleDelete(novel.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 gap-4">
                    <button
                        disabled={page===0}
                        onClick={() => handlePageChange(page-1)}
                        className={`w-[8vw] px-4 py-2 rounded ${page ===0 
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#39afc6] text-white hover:bg-[#2e8ea2] hover:font-bold'
                        }`}
                    >Previous</button>
                    <span className='text-gray-700 py-2' >
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        disabled={page+1>=totalPages}
                        onClick={() => handlePageChange(page+1)}
                        className={`w-[8vw] px-4 py-2 rounded ${page+1 >= totalPages 
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#39afc6] text-white hover:bg-[#2e8ea2] hover:font-bold'
                        }`}
                    >
                        Next
                    </button>
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