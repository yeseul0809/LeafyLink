'use client';
import React, { useEffect, useState } from 'react';
import WeatherComment from './WeatherComment';

interface Weather {
  id: number;
  main: string;
  description: string;
}

function Weather() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // user 위치
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      },
      (error) => {
        setLoading(false);
      }
    );
  }, []);

  // 날씨 api
  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}&lang=kr`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('날씨를 불러오지 못했습니다 :(');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data.weather[0].description);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  return (
    <section className="w-full">
      <div className="w-full h-[45px] m:h-[40px] flex items-center justify-center">
        <WeatherComment weather={weather} />
      </div>
    </section>
  );
}

export default Weather;
