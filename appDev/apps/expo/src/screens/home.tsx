import { SafeAreaView, View, Text, Pressable, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '@acme/api';
import { trpc } from '../utils/trpc';
import React, { useState } from 'react';

const UserInfo: React.FC<{
	user: inferProcedureOutput<AppRouter['user']['all']>[number];
}> = ({ user }) => {
	return (
		<View className='p-4 border-2 border-gray-500 rounded-lg'>
			<Text className='text-xl font-semibold text-gray-800'>{user.name}</Text>
			<Text className='text-gray-600'>{user.role}</Text>
		</View>
	);
};

export const HomeScreen = ({ navigation }: { navigation: any }) => {
	const userQuery = trpc.user.all.useQuery();
	const [showUser, setShowUser] = useState<string | null>(null);

	return (
		<SafeAreaView className='flex'>
			<View className='h-full w-full p-4'>
				<Text style={{ fontSize: 60 }}>Journey</Text>
				<Pressable
					onPress={() => navigation.navigate('Profile', { name: showUser })}
				>
					<Text>Profile</Text>
				</Pressable>
				<Pressable
					onPress={() => navigation.navigate('Map', { name: showUser })}
				>
					<Text>Maps</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('TestAPI')}>
					<Text>test api</Text>
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
			</View>
		</SafeAreaView>
	);
};
