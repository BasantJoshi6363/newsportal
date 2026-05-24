import React, { useState } from 'react'
import { useUserAdminStore } from '../store/use.user.admin.store';
import NewsCard from '../component/NewsCard';

const Home = () => {
   const {loading,news} = useUserAdminStore();
   
   
   
   
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full'>
        {news.length===0 ? "No News Found" : news.map((val,i)=>{
            return <NewsCard data={val} key={val._id} />
        })}


    </div>
  )
}

export default Home