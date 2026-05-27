import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useUserAdminStore } from './store/use.user.admin.store';
import SinglePage from './component/SinglePage';
import NotFound from './pages/NotFound';
import LoadingSpinner from './component/LoadingSpinner';
import Navbar from './component/Navbar';
import Category from './pages/Category';

const App = () => {
  const { loading, getAllNews,news,page } = useUserAdminStore();
  useEffect(()=>{
    getAllNews();
  },[getAllNews,page])
 
  return (
    <div className='p-10'>
      {loading && <LoadingSpinner/>}
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />}></Route>
        <Route path='/news/:id' index element={<SinglePage />}></Route>
        <Route path='/:category' element={<Category />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App