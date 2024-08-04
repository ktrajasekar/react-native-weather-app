import { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';


export default function HomeScreen() {
  const getMmoviesFromApi = () => {
    return fetch("https://reactnative.dev/movies.json").then((response) => response.json()).then(json => {
      return json.movies
    })
  }
  useEffect(() => {
    getMmoviesFromApi()
  }, [])
  return (
    <>
      <ScrollView
      > <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
      }}>
          <Text>TEST</Text>
        </View> <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: 'center'
        }}>
          <Text>TEST</Text>
        </View></ScrollView></>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
