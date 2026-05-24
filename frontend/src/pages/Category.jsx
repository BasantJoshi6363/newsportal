import React from 'react'
import { useParams } from 'react-router-dom'
import NewsCard from '../component/NewsCard';

const Category = ({data}) => {
    const {category} = useParams();
  
    const findCateogry = data.filter(cat=>cat.category===category);
    
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {/* {findCateogry && (
            <NewsCard data={findCateogry} />
        )} */}
        {!findCateogry ? <h5 className='capitalize'>No News Found For {category} Category`</h5> :findCateogry.map((val)=>{
            return <NewsCard data={val} />
        }) }
        
    </div>
  )
}

export default Category