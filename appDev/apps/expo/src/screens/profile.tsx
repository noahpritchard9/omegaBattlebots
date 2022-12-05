import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import Slider from '@react-native-community/slider';
import { trpc } from '../utils/trpc';

export const Profile = ({
	navigation,
	route,
}: {
	navigation: unknown;
	route: any;
}) => {
	const [name, _] = useState<string>(route.params.name);

	const ctx = trpc.useContext();

	const userQuery = trpc.user.byId.useQuery(name);

	const { mutate } = trpc.user.update.useMutation({
		onMutate: () => {
			let optimisticUpdate = ctx.user.byId.getData();
			if (optimisticUpdate) {
				ctx.user.byId.setData(optimisticUpdate);
			}
		},
		onSettled: () => {
			ctx.user.byId.invalidate();
		},
	});

	const [distance, setDistance] = useState(userQuery.data?.distance ?? 0);
	const [elevation, setElevation] = useState(userQuery.data?.elevation ?? 0);
	const [lit, setLit] = useState(userQuery.data?.lit ?? 0);
	const [paved, setPaved] = useState(userQuery.data?.paved ?? 0);
	const [POI, setPOI] = useState(userQuery.data?.POI ?? 0);

	return (
		<SafeAreaView className='w-screen h-screen'>
			<View className='flex justify-start m-2'>
				<View className='bg-gray-300 rounded-xl p-2 mb-2'>
					<Text className='mb-1 text-2xl'>Distance</Text>
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
					<Text className='mb-1 text-2xl'>Elevation</Text>
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
					<Text className='mb-1 text-2xl'>Lit</Text>
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
					<Text className='mb-1 text-2xl'>Paved</Text>
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
					<Text className='mb-1 text-2xl'>POI</Text>
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
			<TouchableOpacity
				onPress={() =>
					mutate({
						id: userQuery.data?.id!,
						distance: distance,
						elevation: elevation,
						lit: lit,
						paved: paved,
						POI: POI,
					})
				}
				className='bg-sky-400 py-4 rounded-xl items-center relative bottom-0 m-2'
			>
				<Text className='text-xl'>Save Preferences</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
