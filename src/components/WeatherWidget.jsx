import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                setError('Location access denied');
                setLoading(false);
            }
        );
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=celsius`
            );
            const data = await response.json();
            setWeather(data.current);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch weather');
            setLoading(false);
        }
    };

    const getWeatherIcon = (code) => {
        // Simplified mapping for WMO Weather interpretation codes (WW)
        if (code === 0) return '☀️'; // Clear sky
        if (code >= 1 && code <= 3) return 'cloudy'; // Partly cloudy
        if (code >= 45 && code <= 48) return '🌫️'; // Fog
        if (code >= 51 && code <= 67) return '🌧️'; // Drizzle/Rain
        if (code >= 71 && code <= 77) return '❄️'; // Snow
        if (code >= 80 && code <= 82) return '🌦️'; // Showers
        if (code >= 95) return '⛈️'; // Thunderstorm
        return '🌥️';
    };

    const getWeatherDescription = (code) => {
        if (code === 0) return 'Clear Sky';
        if (code >= 1 && code <= 3) return 'Partly Cloudy';
        if (code >= 45 && code <= 48) return 'Foggy';
        if (code >= 51 && code <= 67) return 'Rainy';
        if (code >= 71 && code <= 77) return 'Snowy';
        if (code >= 95) return 'Stormy';
        return 'Cloudy';
    };

    if (loading) return <div className="weather-widget loading">Loading weather...</div>;
    if (error) return <div className="weather-widget error">{error}</div>;

    return (
        <div className="weather-widget">
            <div className="weather-icon">{getWeatherIcon(weather.weather_code)}</div>
            <div className="weather-info">
                <span className="temperature">{Math.round(weather.temperature_2m)}°C</span>
                <span className="condition">{getWeatherDescription(weather.weather_code)}</span>
            </div>
        </div>
    );
};

export default WeatherWidget;
