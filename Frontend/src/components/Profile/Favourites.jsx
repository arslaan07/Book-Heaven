import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';
import Loader from '../Home/Loader/Loader';
import api from '../../api';


const Favourites = () => {
    const [FavoriteBooks, setFavoriteBooks] = useState([])
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      useEffect(() => {
        const fetch = async () => {
            const response = await api.get(`api/v1/get-favorite-books`, { headers })
            setFavoriteBooks(response.data.data)
        }
        fetch()
      }, [])
      const handleRemoveFromFavorites = (bookid) => {
        setFavoriteBooks((prevBooks) => (
            prevBooks.filter((book) => book._id !== bookid)
        ))
      }
  return (
    <>
    {
        !FavoriteBooks && <div className='w-full h-screen flex items-center justify-center'><Loader /></div>
      }
      <div className='flex flex-col md:grid grid-cols-4 gap-4 px-4'>
        {
            FavoriteBooks.length > 0 && (
                FavoriteBooks.map((book, i) => (
                    <div key={i}> <BookCard data={book} favorite={true} onRemove={handleRemoveFromFavorites} /> </div>
                ))
            )
        }
      </div>
      {
        FavoriteBooks.length === 0 &&  (
          <div className='md:h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex items-center justify-center md:flex-col'>
              <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-500 mb-8'>
              No Favorite Books
              </h1>
              <img src='../Book.png'
               className='h-[20vh] mb-8' />
          </div>
      </div>
        )
        
    }
    </>
  )
}

export default Favourites
