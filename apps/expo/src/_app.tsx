import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TRPCProvider } from './utils/trpc'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from './screens/home'
import { Profile } from './screens/profile'

const Stack = createNativeStackNavigator()

const App = () => {
	return (
		<TRPCProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name='Home' component={HomeScreen} />
						{/* <HomeScreen /> */}
						<Stack.Screen name='StatusBar' component={StatusBar} />
						{/* <StatusBar /> */}
            <Stack.Screen name='Profile' component={Profile}/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</TRPCProvider>
	)
}

registerRootComponent(App)
