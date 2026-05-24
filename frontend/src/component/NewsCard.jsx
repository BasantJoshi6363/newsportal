import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";

const NewsCard = ({ data }) => {
    return (
        <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col justify-between">
            <div>
                {/* Image Section with Zoom Effect */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <img 
                        src={data.image} 
                        alt={data.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {data.category && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {data.category}
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors duration-200 mb-2">
                        {data.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
                <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                        <span className="text-xs">✍️</span> {data.writtenBy?.name || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-400">
                        {/* {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })} */}
                    </span>
                </div>

                <Link 
                    to={`/news/${data._id}`}
                    className="inline-flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95"
                >
                    Read Details
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;