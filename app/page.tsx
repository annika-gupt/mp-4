import React from 'react';
import WeatherDisplay from '@/components/WeatherDisplay';

export default function Home() {
    return (
        <main className="min-h-screen p-8">
            <h1 className="font-pixelify text-5xl font-bold text-center mb-8 mt-5">Weather App</h1>
            <WeatherDisplay />
        </main>
    );
}