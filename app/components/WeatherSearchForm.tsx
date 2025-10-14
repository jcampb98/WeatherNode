import React from 'react';

const WeatherSearchForm = () => {
  return (
    <div>
        <h2>Search Weather</h2>
        <form className='max-w-md mx-auto'>
            <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
            <div className='relative'>
                <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter town/city or UK postcode (e.g SW1A 1AA)" />            
                <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default WeatherSearchForm;