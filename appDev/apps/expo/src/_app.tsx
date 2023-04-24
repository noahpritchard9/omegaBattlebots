import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TRPCProvider } from './utils/trpc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/home';
import { Profile } from './screens/profile';
import { Map } from './screens/map';
import { LogIn } from './screens/login';
import { SignUp } from './screens/signup';
import TestAPI from './screens/testapi';
import Directions from './screens/directions';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<TRPCProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name='Log In' component={LogIn} />
						<Stack.Screen name='Sign Up' component={SignUp} />
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{ headerBackVisible: false }}
						/>
						<Stack.Screen name='StatusBar' component={StatusBar} />
						<Stack.Screen name='Profile' component={Profile} />
						<Stack.Screen name='Map' component={Map} />
						<Stack.Screen name='TestAPI' component={TestAPI} />
                        <Stack.Screen name='Directions' component={Directions} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</TRPCProvider>
	);
};

registerRootComponent(App);
