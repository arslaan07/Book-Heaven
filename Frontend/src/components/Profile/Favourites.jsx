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
            const response = await api.get(`/get-favorite-books`, { headers })
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
      <div className='flex flex-col md:grid grid-cols-4 gap-4 '>
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
            <div className='md:h-[80vh] flex justify-center items-center text-5xl font-semibold text-zinc-500'>
                 No Favorite Books 
                 <img src='../../public/Book.png' className='h-[20vh] bg-transparent' />
                 </div>
        )
    }
    </>
  )
}

export default Favourites
