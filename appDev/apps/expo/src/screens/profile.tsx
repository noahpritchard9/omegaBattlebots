import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

import Slider from '@react-native-community/slider';
import { trpc } from '../utils/trpc';

export const Profile = ({
	navigation,
	route,
}: {
	navigation: unknown;
	route: any;
}) => {
	const [distance, setDistance] = useState(0);
	const [elevation, setElevation] = useState(0);
	const [lit, setLit] = useState(0);
	const [paved, setPaved] = useState(0);
	const [POI, setPOI] = useState(0);

	let [fontsLoaded] = useFonts({
		Roboto_400Regular,
	});

	if (!fontsLoaded) {
		return null;
	}

	const preferencesQuery = trpc.user.byId;

	return (
		//<View className='flex items-center justify-center'>
		//	<Text className='text-4xl mt-4'>Welcome {route.params.name}</Text>

		//	<Button
		//		title="Press me"
		//		color="#f194ff"
		//	/>
		//</View>

		<SafeAreaView className='w-screen h-screen'>
			<View className='flex justify-start m-2'>
				<View className='bg-gray-300 rounded-xl p-2 mb-2'>
					<Text
						style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}
						className='mb-1'
					>
						Distance
					</Text>
					<View className='flex flex-row items-center justify-between'>
						<Text>Short</Text>
						<Text>Medium</Text>
						<Text>Long</Text>
					</View>
					<Slider
						maximumValue={1}
						minimumValue={-1}
						minimumTrackTintColor='#307ecc'
						maximumTrackTintColor='#000000'
						step={1}
						value={distance}
						onValueChange={setDistance}
						tapToSeek
					/>
				</View>
				<View className='bg-gray-300 rounded-xl p-2 mb-2'>
					<Text
						style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}
						className='mb-1'
					>
						Elevation
					</Text>
					<View className='flex flex-row items-center justify-between'>
						<Text>Lower</Text>
						<Text>Default</Text>
						<Text>Higher</Text>
					</View>
					<Slider
						maximumValue={1}
						minimumValue={-1}
						minimumTrackTintColor='#307ecc'
						maximumTrackTintColor='#000000'
						step={1}
						value={elevation}
						onValueChange={setElevation}
						tapToSeek
					/>
				</View>
				<View className='bg-gray-300 rounded-xl p-2 mb-2'>
					<Text
						style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}
						className='mb-1'
					>
						Lit
					</Text>
					<View className='flex flex-row items-center justify-between'>
						<Text>Dark</Text>
						<Text>Default</Text>
						<Text>Bright</Text>
					</View>
					<Slider
						maximumValue={1}
						minimumValue={-1}
						minimumTrackTintColor='#307ecc'
						maximumTrackTintColor='#000000'
						step={1}
						value={lit}
						onValueChange={setLit}
						tapToSeek
					/>
				</View>
				<View className='bg-gray-300 rounded-xl p-2 mb-2'>
					<Text
						style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}
						className='mb-1'
					>
						Paved
					</Text>
					<View className='flex flex-row items-center justify-between'>
						<Text>No</Text>
						<Text>Default</Text>
						<Text>Yes</Text>
					</View>
					<Slider
						maximumValue={1}
						minimumValue={-1}
						minimumTrackTintColor='#307ecc'
						maximumTrackTintColor='#000000'
						step={1}
						value={paved}
						onValueChange={setPaved}
						tapToSeek
					/>
				</View>
				<View className='bg-gray-300 rounded-xl p-2'>
					<Text
						style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}
						className='mb-1'
					>
						POI
					</Text>
					<View className='flex flex-row items-center justify-between'>
						<Text>No</Text>
						<Text>Default</Text>
						<Text>Yes</Text>
					</View>
					<Slider
						maximumValue={1}
						minimumValue={-1}
						minimumTrackTintColor='#307ecc'
						maximumTrackTintColor='#000000'
						step={1}
						value={POI}
						onValueChange={setPOI}
						tapToSeek
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};
