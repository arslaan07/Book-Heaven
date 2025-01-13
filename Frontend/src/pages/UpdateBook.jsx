import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const UpdateBook = () => {
    const navigate = useNavigate()
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
    })
    const { id } = useParams()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
      };
      const change = (e) => {
        const { name, value } = e.target
        setData({...Data, [name]: value})
      }
      const submit = async () => {
        try {
            if(Data.url === '' || 
                Data.title === '' ||
                Data.author === '' ||
                Data.price === '' ||
                Data.desc === '' ||
                Data.language === ''
            ) {
                alert('All fields are required')
                return
            }
            const response = await api.put(`api/v1/update-book`, Data, { headers })
            setData({
                url: '',
                title: '',
                author: '',
                price: '',
                desc: '',
                language: '',
            })
            navigate(`/view-book-details/${id}`)
            alert(response.data.message)
        } catch (error) {
            alert(error.response.data.message)
        }
      }
      useEffect(() => {
        const fetch = async () => {
          const response = await api.get(
            `api/v1/get-book-by-id/${id}`
          );
          setData(response.data.data);
        };
        fetch();
      }, [id]);
  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4 '>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 py-4 px-2'>
        Update Book
      </h1>
      <div className='bg-zinc-800 rounded p-4'>
        <div>
            <label htmlFor="" className='text-zinc-400 '>Image</label>
            <input type="text" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Image URL'
            name='url'
            required
            value={Data.url}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Title of book</label>
            <input type="text" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='title of book'
            name='title'
            required
            value={Data.title}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Author of book</label>
            <input type="text" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='author of book'
            name='author'
            required
            value={Data.author}
            onChange={change}
            />
        </div>
        <div className='mt-4 flex gap-4 '>
            <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>Language</label>
            <input type="text" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='language of book'
            name='language'
            required
            value={Data.language}
            onChange={change}
            />
            </div>
            <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>Price</label>
            <input type="number" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='price of book'
            name='price'
            required
            value={Data.price}
            onChange={change}
            />
            </div>
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Description of book</label>
            <input type="text" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none '
            placeholder='description of book'
            name='desc'
            required
            value={Data.desc}
            onChange={change}
            />
        </div>
        <button onClick={submit}
        className='mt-4 px-3 bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'>
            Update Book
        </button>
      </div>
    </div>
  )
}

export default UpdateBook
