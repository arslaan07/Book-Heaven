import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api';
import { toast } from 'react-toastify'

const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { isAuthenticated, user } = useSelector(state => state.auth)
  // console.log(isAuthenticated)
  // console.log(user)

  const [ Values, setValues ] = useState({
    username: '',
    password: '',
  })
  const change = (e) => {
    const { name, value } = e.target
    setValues({...Values, [name]: value})
  }
  const submit = async (e) => {
    try {
        const { username, password } = Values
        if(username === '' || password === '') {
          toast.warn('All fields required', {
            theme: 'dark',
          })
            return
        }
        const response = await api.post(`api/v1/sign-in`, Values)
        
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('role', response.data.role)
        toast.success('login successfull !', {
          theme: 'dark',
        })
        response.data.role === 'admin' ? navigate('/profile') : navigate('/')
    } catch (error) {
        toast.error(error.response.data.message, {
          theme: "dark",
        });
    }
  }
  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Login</p>
        <div className='mt-4'>
            <div>
                <label htmlFor="" className='text-zinc-400'>Username</label>
                <input type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='username'
                name='username'
                required
                value={Values.username}
                onChange={change}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor="" className='text-zinc-400'>Password</label>
                <input type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='password'
                name='password'
                required
                value={Values.password}
                onChange={change}
                />
            </div>
            <div className='mt-4'>
                <button 
                className='w-full bg-blue-500 text-white font-semibold py-2 rounded
                 hover:bg-blue-400 transition-all duration-300'
                 onClick={submit}
                 >Login</button>
            </div>
            <div className='mt-4 flex justify-center'>
                <p className='text-zinc-400'>Don't have an account? 
                    <Link to={'/signup'} className='text-blue-500'>  Signup</Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
