import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import CONFIG from "../config.json";

interface LocationProps {
    latitude: number
    longitude: number
}

export default function Page() {
    const [location, setLocation] = useState<LocationProps>({
        latitude: 0,
        longitude: 0
    })
    console.log()
    const [weatherData, setWeatherData] = useState<any>({})
    useEffect(() => {
        const onGeolocationSuccess = (geolocation: GeolocationPosition) => {
            const { latitude, longitude } = geolocation.coords;
            setLocation({ latitude, longitude });
            fetchWeatherData();
        };
        const handleGeolocationError = (error: GeolocationPositionError) => {
            console.error(`Failed to get geolocation: ${error.message}`);
        };
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onGeolocationSuccess, handleGeolocationError)
        async function fetchWeatherData() {
            console.log(`${location.latitude},${location.longitude}`)
            const URL = `https://api.tomorrow.io/v4/weather/forecast?location=${location.latitude},${location.longitude}&apikey=${CONFIG.API_KEY}&timesteps=1d&units=metric&language=en`
            try {
                const response = await fetch(URL);
                const data = await response.json();
                console.log(data)
                setWeatherData(data)
            } catch (error) {
            }
        }

    }, [])
    return (<View style={styles.container}>
        <View style={styles.card}>
            <Text>asdasd</Text>
        </View>
        <View style={styles.card}>
            <Text>asdasd</Text>
        </View>
        <View style={styles.card}>
            <Text>asdasd</Text>
        </View>
        <View style={styles.card}>
            <Text>asdasd</Text>
        </View>
    </View>);


}

const styles: any = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '23%',
        marginVertical: 10,
        marginEnd: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

});