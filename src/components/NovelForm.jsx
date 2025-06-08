import React, { useEffect, useState } from 'react'

const NovelForm = ({novelData, mode="add", onSubmit=""}) => {
    
    const [data, setData] = useState({
        title: "",
        author:"",
        genre:"",
        synopsis:""
    });

    useEffect(() => {
        if(mode == "edit" && novelData) {
            setData({
                title: novelData.novelTitle || "",
                author: novelData.novelAuthor || "",
                genre: novelData.novelGenre || "",
                synopsis: novelData.novelSynopsis || ""
            });
        }
    }, [mode, novelData]);

    const handleChange = (e) => {
        setData({...data, [e.target.id]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    }
    return (
        <div className="w-full min-h-screen flex flex-col min-w-[500px]">
            <div className="flex flex-1 items-center justify-center min-w-[500px]">
                <div className="px-3 bg-[#eff9fb] min-w-[500px] ">
                    <form onSubmit={handleSubmit} 
                    className='min-w-[500px] flex flex-col px-5 py-2 justify-center items-center'>
                        <div className="grid  grid-cols-[auto,1fr]  items-start gap-x-4 gap-y-4 w-full max-w-3xl">
                            <label htmlFor="title" className="pt-2">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={handleChange}
                                className="w-[28vw] min-w-[450px] bg-white border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-400 placeholder-gray-400"
                            />

                            <label htmlFor="author" className="pt-2">Author</label>
                            <input
                                id="author"
                                type="text"
                                value={data.author}
                                onChange={handleChange}
                                className="w-[28vw]  min-w-[450px] bg-white border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-400 placeholder-gray-400"
                            />

                            <label htmlFor="genre" className="pt-2">Genre</label>
                            <input
                                id="genre"
                                type="text"
                                value={data.genre}
                                onChange={handleChange}
                                className="w-[28vw]  min-w-[450px] bg-white border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-400 placeholder-gray-400"
                            />

                            <label htmlFor="synopsis" className="pt-2">Synopsis</label>
                            <textarea
                                id="synopsis"
                                value={data.synopsis}
                                onChange={handleChange}
                                rows="4"
                                className="w-[28vw]  min-w-[450px] bg-white border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-400 placeholder-gray-400 resize-none"
                            ></textarea>

                            <div></div> {/* Empty cell to align button */}
                            <div className="flex justify-end w-[28vw]  min-w-[450px]">
                                <button
                                type="submit"
                                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                {mode === 'add' ? 'Add Novel' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default NovelForm