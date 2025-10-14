import React from 'react'

const Header = () => {
  return (
    <div className='relative h-full w-full p-10'>
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black'>WeatherNode - Accurate Forecasts, Simplified</h1>
        <p className='mb-6 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-900'>
            Stay one step ahead of the weather with real-time forecasts delivered in a clean, 
            responsive interface. Designed for speed and clarity, 
            WeatherNode helps you plan your day with confidence — wherever you are.
        </p>
    </div>
  )
}

export default Header