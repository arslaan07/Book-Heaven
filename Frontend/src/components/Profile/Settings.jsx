import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Home/Loader/Loader';
import api from '../../api';

const Settings = () => {
    const [Value, setValue] = useState()
    const [ProfileData, setProfileData] = useState()

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      useEffect(() => {
        const fetch = async () => {
            const response = await api.get(`/get-user-info`, { headers })
            console.log(response)
            setProfileData(response.data.data)
            setValue({ address: response.data.data.address })
        }
        fetch()
      }, [])
      const change = (e) => {
        setValue({...Value, [e.target.name]: e.target.value })
      }
      const updateAddress = async () => {
        try {
            const response = await  api.put(`/update-address`, Value, { headers })
            alert('Adress updated successfully')
        } catch (error) {
            console.error(error)
        }
      }
  return (
    <>
      {
        !ProfileData && <div><Loader /></div>
      }
      {
        ProfileData && (
            <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                    Settings
                </h1>
                <div className='flex gap-12'>
                    <div className=''>
                        <label htmlFor="">Username</label>
                        <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                            {ProfileData.username}
                        </p>
                    </div>
                    <div className=''>
                        <label htmlFor="">Email</label>
                        <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                            {ProfileData.email}
                        </p>
                    </div>
                </div>
                <div className='mt-4 flex flex-col'>
                    <label htmlFor="">Address</label>
                    <textarea
                    className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
                    name="address" 
                    id=""
                    rows='5'
                    placeholder='Address'
                    value={Value.address}
                    onChange={change}
                    />
                </div>
                <div className='mt-4 flex justify-end'>
                    <button onClick={updateAddress} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'>
                        Update
                    </button>
                </div>
            </div>
        )
      }
    </>
  )
}

export default Settings
