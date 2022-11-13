import { SafeAreaView, View, Text, Pressable, TextInput, Button } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '@acme/api'
import { trpc } from '../utils/trpc'
import React, { useState } from 'react'

const UserInfo: React.FC<{
	user: inferProcedureOutput<AppRouter['user']['all']>[number]
}> = ({ user }) => {
	return (
		<View className='p-4 border-2 border-gray-500 rounded-lg'>
			<Text className='text-xl font-semibold text-gray-800'>{user.name}</Text>
			<Text className='text-gray-600'>{user.role}</Text>
		</View>
	)
}

const CreateUser: React.FC = () => {
	const utils = trpc.useContext()
	const { mutate } = trpc.user.create.useMutation({
		async onSuccess() {
			await utils.user.all.invalidate()
			setName('')
			setAge(0)
			setEmail('')
			setPassword('')
		},
		onError(e) {
			alert('Please check your input again')
			console.log('error in mutation', e.message)
		},
	})

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [password, setPassword] = useState<string>('')

	const onChangeAge = (age: string) => {
		// let newText = ''
		// let numbers = '0123456789'
		// for (let i = 0; i < age.length; i++) {
		// 	if (numbers.indexOf(age[i]) > -1) {
		// 		newText += age[i]
		// 	} else {
		// 		alert('Age can only be a number')
		// 	}
		// }
		const newAge = age.replace(/\D/g, '')
		if (newAge.length === 0) alert('Age must be a number')
		setAge(+newAge)
	}

	return (
		<View className='p-4 border-t-2 border-gray-500 flex flex-col'>
			<TextInput
				className='border-2 border-gray-500 rounded p-2 mb-2'
				value={name}
				onChangeText={setName}
				placeholder='Name'
			/>
			<TextInput
				keyboardType='number-pad'
				className='border-2 border-gray-500 rounded p-2 mb-2'
				value={age > 0 ? age.toString() : ''}
				onChangeText={newAge => onChangeAge(newAge)}
				placeholder='Age'
			/>
			<TextInput
				className='border-2 border-gray-500 rounded p-2 mb-2'
				value={email}
				onChangeText={setEmail}
				placeholder='Email'
				autoCapitalize='none'
			/>
			<TextInput
				className='border-2 border-gray-500 rounded p-2 mb-2'
				value={password}
				onChangeText={setPassword}
				placeholder='Password'
				autoCapitalize='none'
				secureTextEntry={true}
			/>
			<Pressable
				className='bg-indigo-500 rounded p-2'
				onPress={() => {
					mutate({
						name,
						email,
						age,
						password,
					})
				}}
			>
				<Text className='text-white font-semibold'>Update user</Text>
			</Pressable>
		</View>
	)
}

export const HomeScreen = ({ navigation }: { navigation: any }) => {
	const userQuery = trpc.user.all.useQuery()
	const [showUser, setShowUser] = useState<string | null>(null)

	return (
		<SafeAreaView className='flex'>
			<View className='h-full w-full p-4'>
				<Text className='text-5xl font-bold mx-auto pb-2'>Journey</Text>
				<Pressable
					onPress={() => navigation.navigate('Profile', { name: showUser })}
				>
					<Text>Profile</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('Map')}>
					<Text>Maps</Text>
				</Pressable>

				<View className='py-2'>
					{showUser ? (
						<Text>
							<Text className='font-semibold'>Selected user:</Text>
							{showUser}
						</Text>
					) : (
						<Text className='italic font-semibold'>Press on a user</Text>
					)}
				</View>

				<FlashList
					data={userQuery.data}
					estimatedItemSize={10}
					ItemSeparatorComponent={() => <View className='h-2' />}
					renderItem={u => (
						<Pressable onPress={() => setShowUser(u.item.name)}>
							<UserInfo user={u.item} />
						</Pressable>
					)}
				/>

				<CreateUser />
			</View>
		</SafeAreaView>
	)
}
