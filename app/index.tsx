import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface LocationProps {
    latitude: number
    longitude: number
}

export default function Page() {
    const [location, setLocation] = useState<LocationProps>({
        latitude: 0,
        longitude: 0
    })
    const API_KEY = "";
    useEffect(() => {
        const onGeolocationSuccess = (geolocation: GeolocationPosition) => {
            const { latitude, longitude } = geolocation.coords;
            setLocation({ latitude, longitude });
            fetchWeatherData();
        };
        const handleGeolocationError = (error: GeolocationPositionError) => {
            console.error(`Failed to get geolocation: ${error.message}`);
        };
        if(navigator.geolocation)navigator.geolocation.getCurrentPosition(onGeolocationSuccess, handleGeolocationError)
        async function fetchWeatherData() {
            const URL = `https://api.tomorrow.io/v4/weather/forecast?location=${location.latitude},${location.longitude}&apikey=${API_KEY}`
            try {
                const response = await fetch(URL);
                const data = await response.json();
                console.log(data)
            } catch (error) {
            }
        }
       
    }, [])
    return <View>

    </View>;
}
