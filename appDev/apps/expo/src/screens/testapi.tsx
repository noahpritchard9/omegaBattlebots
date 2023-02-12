import { SafeAreaView, View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type LatLng } from 'react-native-maps';

const URL = 'http://10.0.0.7:8080';

export const TestAPI = ({ navigation }: { navigation: any }) => {
	const fetchFinalRoute = async () => {
		try {
			const res = await fetch(`${URL}/route`);
			return res.json() as Promise<LatLng[]>;
		} catch (e) {
			console.log(e);
		}
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
						<Text>{finalRouteQuery.data[0].latitude}</Text>
						<Text>{finalRouteQuery.data[0].longitude}</Text>
					</View>
				) : (
					<Text>No data</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

export default TestAPI;
