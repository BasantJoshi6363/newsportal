import React from 'react'
import { useParams } from 'react-router-dom'
import NewsCard from '../component/NewsCard';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../lib/axios';
import LoadingSpinner from '../component/LoadingSpinner';

const Category = ({ data }) => {
    const { category } = useParams();
    const [loading, setLoading] = useState(false);
    const [categoryNews,setCategoryNews] = useState([]);
    const fetchCategory = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/news/cat/${category}`);
            setCategoryNews(response.data.news)
        } catch (error) {
           
            console.log(error);
            setLoading(false);

        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [category]);

    if(loading)return <LoadingSpinner/>;


    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            {categoryNews && (
            <NewsCard data={categoryNews} />
        )}
            {!categoryNews ? <h5 className='capitalize'>No News Found For {category} Category`</h5> : categoryNews.map((val) => {
                return <NewsCard data={val} />
            })}

        </div>
    )
}

export default Category