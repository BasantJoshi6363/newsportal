import React, { useEffect } from 'react';
import { useUserAdminStore } from '../store/use.user.admin.store';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

const SinglePage = () => {
    const { id } = useParams();
    const { getSingleNews, singleNews, singlePageLoading } = useUserAdminStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSingleNews(id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id, getSingleNews]);

    if (singlePageLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!singleNews || !singleNews._id) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12 text-center">
                <p className="text-gray-500 mb-4">Article not found.</p>
                <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            {/* Back Navigation */}
            <div className="mb-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                >
                    <span className="mr-1.5 text-base">←</span> Back to Articles
                </Link>
            </div>

            {/* Header Content */}
            <header className="mb-8">
                {singleNews.category && (
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                        {singleNews.category}
                    </span>
                )}
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                    {singleNews.title}
                </h1>

                {/* Meta Details */}
                <div className="flex items-center justify-between border-y border-gray-100 py-4">
                    <div className="flex items-center gap-3">
                        {/* Avatar Placeholder */}
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            {singleNews.writtenBy?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {singleNews.writtenBy?.name || "Unknown Author"}
                            </p>
                            <p className="text-xs text-gray-400">Contributor</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Published</p>
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                            {formatDistanceToNow(new Date(singleNews.updatedAt), { addSuffix: true })}
                        </p>
                    </div>
                </div>
            </header>

            {/* Hero Image */}
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm bg-gray-50 mb-8">
                <img 
                    src={singleNews.image} 
                    alt={singleNews.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Body Description Text */}
            <div className="prose max-w-none">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                    {singleNews.description}
                </p>
            </div>
        </article>
    );
};

export default SinglePage;