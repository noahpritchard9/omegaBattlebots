import {
	SafeAreaView,
	View,
	Text,
	Pressable,
	Dimensions,
	StyleSheet,
} from 'react-native';
import type { AppRouter } from '@acme/api';
import { trpc } from '../utils/trpc';
import React, { useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
	latitude: 38.9007,
	longitude: 77.0518,
	latitudeDelta: LATITUDE_DELTA,
	longitudeDelta: LONGITUDE_DELTA,
};

export const HomeScreen = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const [name, _] = useState<string>(route.params.name);
	const userQuery = trpc.user.byId.useQuery(name);
	const mapRef = useRef<MapView>(null);

	const [region, setRegion] = useState<Region>(INITIAL_REGION);

	return (
		<SafeAreaView className='flex items-center justify-center'>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={region}
				// region={region}
				// this could be causing issue with scrolling w using old region
				onRegionChange={setRegion}
				// region={INITIAL_REGION}
				// onRegionChangeComplete={() => {
				// 	mapRef.current?.animateToRegion(INITIAL_REGION)
				// }}
				showsUserLocation
				onUserLocationChange={e => {
					setRegion({
						latitude: e.nativeEvent.coordinate?.latitude!,
						longitude: e.nativeEvent.coordinate?.longitude!,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					});
					mapRef.current?.animateToRegion(region);
				}}
			/>
			<Pressable
				className='absolute top-4 right-4 bg-sky-300 p-2 rounded-xl active:bg-sky-500'
				onPress={() => navigation.navigate('Profile', { name: name })}
			>
				<Text>Profile</Text>
			</Pressable>
			<Pressable
				className='absolute bottom-24 bg-sky-300 p-4 w-3/4 items-center rounded-xl active:bg-sky-500'
				onPress={() => navigation.navigate('Map', { name: name })}
			>
				<Text>Start Walking</Text>
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	map: {
		// flex: 1,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
});
