import React from 'react'
import { useUserAdminStore } from '../store/use.user.admin.store'

const Pagination = () => {
  const { totalPage,setCurrentPage } = useUserAdminStore();
  

  return (
    <div className='flex gap-2'>
      {
        Array.from({ length: totalPage }).map((_, i) => {
          const page = i + 1;
          return <button  key={i} onClick={()=>setCurrentPage(page)} className='px-2 py-2 w-10 bg-slate-400 text-white font-bold'>{page}</button>
        })

      }

    </div>
  )
}

export default Pagination