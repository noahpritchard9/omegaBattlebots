import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	Image,
	Text,
} from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_API_KEY } from '../apiKeys';
import { trpc } from '../utils/trpc';

const URL = 'http://128.164.192.77:8080';

export interface GoogleLocationResponse {
	location: Location;
	accuracy: number;
}

export interface Location {
	lat: number;
	lng: number;
}

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

export const Map = ({ navigation, route }: { navigation: any; route: any }) => {
	const mapRef = useRef<MapView>(null);

	const [name, _] = useState<string>(route.params.name);

	const userQuery = trpc.user.byId.useQuery(name);

	const [region, setRegion] = useState<Region>(INITIAL_REGION);

	const [duration, setDuration] = useState<string>('');
	const [distance, setDistance] = useState<string>('');

	const fetchLocation = async (): Promise<GoogleLocationResponse> =>
		(
			await fetch(
				`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`
			)
		).json();

	// const userLocationQuery = useQuery({
	// 	queryKey: ['userLocation'],
	// 	queryFn: fetchLocation,
	// });

	// const userLocation: LatLng = {
	// 	latitude: userLocationQuery.data?.location.lat ?? 37.79879,
	// 	longitude: userLocationQuery.data?.location.lng ?? -122.442753,
	// };

	// const sendUserLocation = () => {
	// 	fetch(`${URL}/user`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(userLocationQuery.data),
	// 	});
	// };

	// const fetchFinalRoute = async () => {
	// 	try {
	// 		const res = await fetch(`${URL}/route`);
	// 		return res.json() as Promise<LatLng[]>;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	const preferences = {
		shade: userQuery.data?.shade,
		PoI: userQuery.data?.POI,
		paved: userQuery.data?.paved,
		lit: userQuery.data?.lit,
		distance: userQuery.data?.distance,
	};

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
		// enabled: !!userLocationQuery.data,
	});

	const origin: LatLng = {
		// latitude: 38.89963,
		// longitude: -77.0489,
		latitude: 38.899176,
		longitude: -77.047092,
	};

	const dest: LatLng = { latitude: 38.89963, longitude: -77.0489 };

	// if (userLocationQuery.isLoading) {
	// 	return (
	// 		<SafeAreaView>
	// 			<Text>Loading user location data</Text>
	// 		</SafeAreaView>
	// 	);
	// }

	// if (userLocationQuery.isError) {
	// 	return (
	// 		<SafeAreaView>
	// 			<Text>
	// 				Error getting user location data, {(userLocationQuery.error as Error).message}
	// 			</Text>
	// 		</SafeAreaView>
	// 	);
	// }

	if (finalRouteQuery.isLoading) {
		return (
			<SafeAreaView className='flex items-center justify-center h-screen -m-24 bg-sky-100'>
				<Image
					source={require('../../assets/bird.gif')}
					className='h-80 w-80'
				/>
				<Text className='m-2'>This may take a minute</Text>
			</SafeAreaView>
		);
	}

	if (finalRouteQuery.isError) {
		return (
			<SafeAreaView>
				<Text>
					Error getting route data, {(finalRouteQuery.error as Error).message}
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className='flex items-center justify-center'>
			<MapView
				ref={mapRef}
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
			>
				{finalRouteQuery.data !== undefined ? (
					<MapViewDirections
						origin={finalRouteQuery.data.route[0] ?? origin}
						destination={finalRouteQuery.data.route.at(-1) ?? dest}
						waypoints={finalRouteQuery.data.route.slice(1, 24)}
						apikey={GOOGLE_MAPS_API_KEY}
						mode='WALKING'
						splitWaypoints={true}
						strokeWidth={3}
						strokeColor='hotpink'
						onStart={s => console.log(s)}
						onError={e => console.error(e)}
						onReady={res => {
							console.log(res);
							setDuration(res.duration.toFixed(0));
							setDistance(res.distance.toFixed(1));
							mapRef.current?.fitToCoordinates(res.coordinates, {
								edgePadding: {
									top: height / 20,
									right: width / 20,
									bottom: height / 20,
									left: width / 20,
								},
							});
						}}
					></MapViewDirections>
				) : (
					<Text>{JSON.stringify(finalRouteQuery)}</Text>
				)}
			</MapView>
			{duration && (
				<Text className='absolute top-0 right-0 m-2 font-bold'>
					{duration} minutes
				</Text>
			)}
			{distance && (
				<Text className='absolute top-4 right-0 m-2 font-bold'>
					{distance} km
				</Text>
			)}
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
