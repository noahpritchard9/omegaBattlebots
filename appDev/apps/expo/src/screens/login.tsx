import React, { useEffect, useState } from 'react';

import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { trpc } from '../utils/trpc';

export const LogIn = ({ navigation }: { navigation: any }) => {
	const [loginError, setLoginError] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const loginQuery = trpc.user.byId.useQuery(username);

	const [loginDisabled, setLoginDisabled] = useState(false);

	useEffect(() => {
		setLoginDisabled(username === '' || password === '');
	});

	const enabledClass =
		'relative bottom-0 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center';

	const disabledClass =
		'relative bottom-0 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center opacity-50';

	return (
		<SafeAreaView className='w-full h-full'>
			<View className='flex items-center justify-center mt-4'>
				<Text className='text-5xl font-bold'>Welcome to</Text>
				<Text className='text-5xl font-bold text-sky-500'>Journey!</Text>
				{loginError && <Text className='text-red-500'>{loginError}</Text>}
				<View className='p-4 flex w-3/4'>
					<TextInput
						className='border-2 border-gray-500 rounded p-2 mb-2'
						value={username}
						onChangeText={setUsername}
						placeholder='Name'
					/>
					<TextInput
						className='border-2 border-gray-500 rounded p-2 mb-2'
						value={password}
						onChangeText={setPassword}
						placeholder='Password'
						autoCapitalize='none'
						secureTextEntry={true}
					/>
				</View>
				<Text className='mt-4'>
					Need an account?{' '}
					<Text
						onPress={() => navigation.navigate('Sign Up', { name: username })}
						className='text-sky-500 underline'
					>
						Sign up
					</Text>
				</Text>
			</View>
			<View className='flex items-center justify-center h-screen'>
				<TouchableOpacity
					onPress={() =>
						loginQuery.data
							? navigation.navigate('Home', { name: username })
							: setLoginError('Account not found, please try again.')
					}
					className={loginDisabled ? disabledClass : enabledClass}
				>
					<Text>Log In</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
