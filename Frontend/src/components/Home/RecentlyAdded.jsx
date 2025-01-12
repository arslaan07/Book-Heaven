import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import Loader from './Loader/Loader';
import api from '../../api';

const RecentlyAdded = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Optional for better clarity
    const [error, setError] = useState(null); // Optional for error handling

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get(`/get-recent-books`);
                setData(response.data.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch books');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center my-8'>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className='text-center text-red-500'>
                <p>Failed to load recently added books: {error}</p>
            </div>
        );
    }

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
            <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
                {data.length > 0 ? (
                    data.map((item, i) => (
                        <div key={i}>
                            <BookCard data={item} />
                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentlyAdded;
