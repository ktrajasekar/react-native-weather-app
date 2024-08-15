
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, PermissionsAndroid, Platform } from 'react-native';
import CONFIG from "../config.json";
import reponse from "../app/response.json"

interface LocationProps {
    latitude: number
    longitude: number
}

export default function Index() {
    console.log(reponse)
    const [location, setLocation] = useState<LocationProps>({
        latitude: 0,
        longitude: 0
    })
    console.log()
    //reponse.timelines.daily
    const [weatherData, setWeatherData] = useState<any>([])
    useEffect(() => {

        async function requestLocationPermission() {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    );
                    console.log("asdasdas", granted)
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        const onGeolocationSuccess = (geolocation: GeolocationPosition) => {
                            const { latitude, longitude } = geolocation.coords;
                            console.log(`You are at latitude: ${latitude} and longitude: ${longitude}`);
                            setLocation({ latitude, longitude });
                            fetchWeatherData();
                        };
                        fetchWeatherData();
                        const handleGeolocationError = (error: GeolocationPositionError) => {
                            console.error(`Failed to get geolocation: ${error.message}`);
                        };
                        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onGeolocationSuccess, handleGeolocationError)
                        async function fetchWeatherData() {
                            console.log(`${location.latitude},${location.longitude}`)
                            const URL = `https://api.tomorrow.io/v4/weather/forecast?location=${location.latitude},${location.longitude}&apikey=${CONFIG.API_KEY}&timesteps=1d&units=metric&language=en`
                            try {
                                const response = await fetch(URL, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                                const data = await response.json();
                                console.log(data)
                                setWeatherData(data.timelines.daily)
                            } catch (error) {
                            }
                        }
                    } else {
                        console.log("Location permission denied");
                    }
                }

            } catch (err) {
                console.warn(err);
            }
        }
        requestLocationPermission()
    }, [])
    const formatTime = (time: string) => {
        const date = new Date(time);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formattedDate;
    }
    return (<View style={styles.container}>
        {weatherData.length > 0 && weatherData?.map((data: any) => {
            return (
                <View key={data.time} style={styles.card}>
                    <Text style={styles.heading}>{formatTime(data.time)}</Text>
                    <Text> Minimum Temperature: {data.values.temperatureMin}</Text>
                    <Text> Maximum Temperature: {data.values.temperatureMax}</Text>
                </View>
            );
        })}
    </View>);
}

const styles: any = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
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
        width: '30%',
        marginVertical: 10,
        marginEnd: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});