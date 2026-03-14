import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { 
  registerForPushNotificationsAsync, 
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener 
} from '@/lib/notifications'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        console.log('Push token:', token)
        // Save token when user is authenticated
      }
    })

    // Handle notifications when app is foregrounded
    const notificationListener = addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification)
    })

    // Handle notification taps
    const responseListener = addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response)
      // Navigate based on notification data
    })

    SplashScreen.hideAsync()

    return () => {
      notificationListener.remove()
      responseListener.remove()
    }
  }, [])

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </>
  )
}
