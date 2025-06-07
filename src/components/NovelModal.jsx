import React from 'react';

const NovelModal = ({ isOpen, onClose, txtMessage }) => { 
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500/30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-[90%]">
                
                {/* Modal Header with Close Button */}
                <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-t-xl">
                    <span className="font-semibold text-lg"></span>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-5">
                    <p className="text-gray-800 text-base my-5">{txtMessage}</p>
                    <div className="mt-5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NovelModal;
