"use client";
import React, { useState, useEffect } from 'react';

interface WeatherSearchFormProps {
    onSearch: (userInput: string) => void;
}

export default function WeatherSearchForm({ onSearch }: WeatherSearchFormProps) {
    const [userInput, setUserInput] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Load recent searches from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("recentSearches");
        if(stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    // handles searching with user input and saving to localStorage
    const handleSearch = (e?: React.FormEvent) => {
        if(e) e.preventDefault();

        const trimmedInput = userInput.trim();

        if(!trimmedInput) return;

        onSearch(trimmedInput);

        const updated = [
            trimmedInput, 
            ...recentSearches.filter((u) => u.toLowerCase() !== trimmedInput.trim().toLowerCase())
        ].slice(0, 5); //this removes duplicates and keeps 5 history items as a max

        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
        setUserInput("");
    };

    return (
      <div>
          <h2>Search Weather</h2>
          <form className='max-w-md mx-auto' onSubmit={(e) =>  {e.preventDefault(); handleSearch();}}>
              <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
              <div className='relative'>
                  <input 
                    type="text" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Enter town/city or UK postcode (e.g SW1A 1AA)" 
                    onChange={(e) => setUserInput(e.target.value)}
                  />            
                  <button type='submit' className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl' onClick={handleSearch}>Submit</button>
              </div>
          </form>

          {recentSearches.length > 0 && (
            <ul>
                {recentSearches.map((search, id) => (
                    <li key={id}>
                        <button onClick={() => onSearch(search)}>{search}</button>
                    </li>
                ))}
            </ul>
          )}
      </div>
    )
}