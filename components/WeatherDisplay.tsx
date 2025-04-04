"use client";

import { useState } from 'react';
import { WeatherData } from '@/app/api/weather/types';

export default function WeatherDisplay() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        if (!location.trim()) {
            setError('Please enter a location');
            return;
        }

        setLoading(true);
        setError('');
        setWeatherData(null);

        try {
            const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch weather data');
            }

            setWeatherData(data as WeatherData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to connect to the server');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city or zip code"
                    className="flex-1 p-2 border rounded"
                    onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                />
                <button
                    onClick={fetchWeather}
                    disabled={loading || !location.trim()}
                    className="bg-pink-300 text-white p-2 rounded disabled:bg-pink-200"
                >
                    {loading ? 'Loading...' : 'Get Weather'}
                </button>
            </div>

            {error && (
                <div>
                    {error}
                </div>
            )}

            {weatherData && weatherData.currentConditions && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Weather in {weatherData.resolvedAddress}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>Temperature: {weatherData.currentConditions.temp}°F</p>
                            <p>Feels Like: {weatherData.currentConditions.feelslike}°F</p>
                            <p>Humidity: {weatherData.currentConditions.humidity}%</p>
                        </div>
                        <div>
                            <p>Conditions: {weatherData.currentConditions.conditions}</p>
                            <p>Wind Speed: {weatherData.currentConditions.windspeed} mph</p>
                            <p>UV Index: {weatherData.currentConditions.uvindex}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}