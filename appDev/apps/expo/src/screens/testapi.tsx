import { SafeAreaView, View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type LatLng } from 'react-native-maps';

const URL = 'http://128.164.194.103:8080';

const origin: LatLng = {
	latitude: 38.89963,
	longitude: -77.0489,
};

const preferences = {
	elevation: 0,
	PoI: 1,
	paved: 1,
	lit: 1,
	distance: -1,
};

const data = { location: origin, preferences: preferences };

export const TestAPI = ({ navigation }: { navigation: any }) => {
	const fetchFinalRoute = async () => {
		const res = await fetch(`${URL}/route`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ location: origin, preferences: preferences }),
		});
		return res.json();
	};

	const finalRouteQuery = useQuery({
		queryKey: ['finalRoute'],
		queryFn: fetchFinalRoute,
	});

	if (finalRouteQuery.isLoading) {
		return <Text>Loading...</Text>;
	}

	if (finalRouteQuery.isError) {
		return <Text>Error: {(finalRouteQuery.error as Error).message}</Text>;
	}

	return (
		<SafeAreaView className='flex'>
			<View className='h-full w-full p-4'>
				{!!finalRouteQuery.data ? (
					<View>
						<Text>{JSON.stringify(finalRouteQuery.data)}</Text>
					</View>
				) : (
					<Text>No data</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

export default TestAPI;
