"use client";
import React, { useState, useEffect } from 'react';
import { parse } from "postcode";

interface WeatherSearchFormProps {
    onSearch: (value: string, type: 'zip' | 'city' | 'coords', lat?: number, lon?: number) => void;
}

export default function WeatherSearchForm({ onSearch }: WeatherSearchFormProps) {
    const [userInput, setUserInput] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isLocating, setIsLocating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load recent searches from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("recentSearches");
        if(stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    const processInput = (input: string): { processedInput: string, inputType: 'zip' | 'city'} => {
        const trimmed = input.trim().toUpperCase();

        const parsed = parse(trimmed);

        if(parsed.valid) {
            if(parsed.outcode) {
                return {
                    processedInput: parsed.outcode,
                    inputType: 'zip'
                };
            }
        }

        return {
            processedInput: trimmed,
            inputType: 'city'
        };
    };

    //this handles the recent searches the user inputted
    const handleRecentSearchClick = (search: string) => {
        const { processedInput, inputType } = processInput(search);

        onSearch(processedInput, inputType);

        setUserInput("");
    }

    // handles searching with user input and saving to localStorage
    const handleSearch = (e?: React.FormEvent) => {
        if(e) 
            e.preventDefault(); // Prevent from reload

        setError(null); // Clears geolocation error on manual search

        const trimmedInput = userInput.trim();

        if(!trimmedInput) return;

        // to detect if its a postcode or city
        const { processedInput, inputType } = processInput(trimmedInput);

        onSearch(processedInput, inputType);

        const updated = [
            trimmedInput, 
            ...recentSearches.filter((u) => u.toLowerCase() !== trimmedInput.trim().toLowerCase())
        ].slice(0, 5); //this removes duplicates and keeps 5 history items as a max

        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
        setUserInput("");
    };

    // Geolocation handler
    const handleGeolocationSearch = () => {
        if(!navigator.geolocation) {
            setError("Geolocation is not supported by your browser. Please switch to a compatible browser");
            return;
        }

        setIsLocating(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                onSearch('Current Location', 'coords', latitude, longitude);

                setIsLocating(false);
                setUserInput("");
            },
            (error) => {
                console.error("Geolocation Error: ", error);
                let errorMessage = "Unable to retrieve your location";
                if(error.code === error.PERMISSION_DENIED) {
                    errorMessage = "Location permission denied. Please enable it in your browser";
                }
                setError(errorMessage);
                setIsLocating(false);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div className='max-w-xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-xl mt-10'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6 border-b pb-2'>
                Find Weather
            </h2>

            {error && (
                <div className='mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg' role='alert'>
                    {error}
                </div>
            )}
            
            <form className='mb-6' onSubmit={handleSearch}>
                <div className='flex space-x-2'>
                    <div className='flex-grow relative'>
                        <input 
                            type="text" 
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Enter town/city or UK postcode (e.g SW1A 1AA)" 
                            onChange={(e) => setUserInput(e.target.value)}
                        />            
                    </div>

                    <button 
                        type='submit' 
                        className='px-5 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50' 
                        onClick={handleSearch}
                    >
                        Submit
                    </button>
                </div>
            </form>

            <div className='mb-6'>
                <button 
                    onClick={handleGeolocationSearch}
                    disabled={isLocating}
                    className='w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-indigo-500 text-indigo-600 font-medium text-sm rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isLocating ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Locating...</span>
                            </>
                        ) : (
                            <>
                                <span>Use Current Location</span>
                            </>
                        )}
                    </button>
            </div>

            {
                recentSearches.length > 0 && (
                    <div className='pt-4 border-t border-gray-200'>
                        <h3 className='text-base font-medium text-gray-700 mb-3'>Recent Searches</h3>
                        <ul className='flex flex-wrap gap-2'>
                            {recentSearches.map((search, id) => (
                                <li key={id}>
                                    <button 
                                        onClick={() => handleRecentSearchClick(search)}
                                        className='text-blue-500 hover:underline'
                                    >
                                    {search}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}