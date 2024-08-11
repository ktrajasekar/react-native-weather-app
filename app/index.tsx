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
        const successFn = (position: any) => {
            setLocation(position.coords)
            getWeatherData()
        }
        const errorCallback = (error: any) => {
            console.log(error)
        }
        navigator.geolocation.getCurrentPosition(successFn, errorCallback)
        async function getWeatherData() {
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