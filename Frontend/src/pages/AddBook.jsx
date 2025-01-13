import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const AddBook = () => {
    const navigate = useNavigate()
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
    })
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
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
                toast.warn('All fields required', {
                            theme: 'dark',
                          })
                return
            }
            const response = await api.post(`api/v1/add-book`, Data, { headers })
            setData({
                url: '',
                title: '',
                author: '',
                price: '',
                desc: '',
                language: '',
            })
            navigate('/')
            toast.success(response.data.message, {
                      theme: 'dark',
                    })
        } catch (error) {
            toast.error(error.response.data.message, {
                    theme: 'dark',
                  })
        }
      }
  return (
    <div className='h-[100%] px-4 md:p-4 '>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 '>
        Add Book
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
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='description of book'
            name='desc'
            required
            value={Data.desc}
            onChange={change}
            />
        </div>
        <button onClick={submit}
        className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'>
            Add Book
        </button>
      </div>
    </div>
  )
}

export default AddBook
