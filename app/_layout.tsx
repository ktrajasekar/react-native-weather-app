import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{
        headerTitle: "Welcome - Weather",
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </Stack>
  );
}
