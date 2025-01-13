import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../api';
import { toast } from 'react-toastify';

const BookCard = ({ data, favorite, onRemove }) => {
    console.log(data)
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
      };
    const handleRemoveBook = async () => {
        try {
            const response = await api.delete(`api/v1/remove-book-from-favorite`, { headers })
            onRemove(data._id)
            toast.success(response.data.message, {
              theme: 'dark',
            })
        } catch (error) {
          toast.error(error.message, {
            theme: 'dark',
          })
        }
       
      }
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className=''>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
                <img src={data.url} alt='/' className='h-[25vh]' />
            </div>
            <h2 className='mt-4 text-xl font-semibold text-white'> {data.title} </h2>
            <p className='mt-2 text-zinc-400 font-semibold'>by {data.author} </p>
            <p className='mt-2 text-zinc-200 font-semibold'>Rs. {data.price} </p>
        </div>
      </Link>
      {
        favorite && (
            <button className='bg-yellow-100 text-sm md:text-xl px-4 py-2 mt-2 rounded border border-yellow-500 text-zinc-500'
            onClick={handleRemoveBook}>Remove from favorite</button>

        )
      }
    </div>
  )
}

export default BookCard
