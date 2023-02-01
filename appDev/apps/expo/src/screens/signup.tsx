import React, { useEffect, useState } from 'react';

import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { trpc } from '../utils/trpc';

export const SignUp = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const [username, setUsername] = useState<string>(route.params.name ?? '');
	const [email, setEmail] = useState<string>('');
	const [age, setAge] = useState<number>(0);
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [signUpError, setSignUpError] = useState<string>('');

	const signUpQuery = trpc.user.create.useMutation({
		onError() {
			setSignUpError('Account already exists, please try again.');
		},
	});

	const [signUpDisabled, setSignUpDisabled] = useState(false);

	useEffect(() => {
		setSignUpDisabled(
			username === '' ||
				age === 0 ||
				email === '' ||
				password === '' ||
				confirmPassword === ''
		);
	});

	const enabledClass =
		'relative bottom-10 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center';

	const disabledClass =
		'relative bottom-10 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center opacity-50';

	const onChangeAge = (age: string) => {
		const newAge = age.replace(/\D/g, '');
		if (newAge.length === 0) alert('Age must be a number');
		setAge(+newAge);
	};

	return (
		<SafeAreaView className='w-full h-full'>
			<View className='flex items-center justify-center p-4'>
				<Text className='text-4xl font-bold mb-4'>Create an Account</Text>
				{signUpError && <Text className='text-red-500'>{signUpError}</Text>}
				<TextInput
					value={username}
					placeholder='Username'
					onChangeText={setUsername}
					className='border-2 border-gray-500 rounded p-2 mb-2 w-3/4'
				></TextInput>
				<TextInput
					keyboardType='number-pad'
					className='border-2 border-gray-500 rounded p-2 mb-2 w-3/4'
					value={age > 0 ? age.toString() : ''}
					onChangeText={newAge => onChangeAge(newAge)}
					placeholder='Age'
				/>
				<TextInput
					className='border-2 border-gray-500 rounded p-2 mb-2 w-3/4'
					value={email}
					onChangeText={setEmail}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					value={password}
					placeholder='Password'
					onChangeText={setPassword}
					secureTextEntry={true}
					className='border-2 border-gray-500 rounded p-2 mb-2 w-3/4'
				></TextInput>
				<TextInput
					value={confirmPassword}
					placeholder='Confirm Password'
					onChangeText={setConfirmPassword}
					secureTextEntry={true}
					className='border-2 border-gray-500 rounded p-2 mb-2 w-3/4'
				></TextInput>
			</View>
			<View className='flex items-center justify-center h-screen'>
				<TouchableOpacity
					onPress={() => {
						setSignUpError('');
						if (password === confirmPassword) {
							signUpQuery.mutate({
								name: username,
								password: password,
								age: age,
								email: email,
							});
							navigation.navigate('Home', { name: username });
						} else {
							setSignUpError('Passwords do not match, please try again.');
						}
					}}
					disabled={signUpDisabled}
					className={signUpDisabled ? disabledClass : enabledClass}
				>
					<Text>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
